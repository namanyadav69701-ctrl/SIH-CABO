import express from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

// Body parser
app.use(express.json());

// Persistent database storage path
const DATA_DIR = path.join(process.cwd(), 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const CREDENTIALS_FILE = path.join(DATA_DIR, 'credentials.json');
const SESSIONS_FILE = path.join(DATA_DIR, 'sessions.json');

// Ensure data directory and files exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

interface StoredUser {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: 'seller' | 'buyer';
  companyName: string | null;
  authProvider: 'email' | 'google';
  createdAt: string;
  updatedAt: string;
  city?: string;
  nodeId?: string;
  systemCapacityKw?: number;
  walletBalanceInr?: number;
  totalEarningsInr?: number;
  verifiedCreditsAccrued?: number;
  discomZone?: string;
  avatarInitials?: string;
}

interface StoredCredential {
  userId: string;
  passwordHash: string;
  passwordSalt: string;
}

interface StoredSession {
  token: string;
  userId: string;
  role: 'seller' | 'buyer';
  expiresAt: number;
  createdAt: number;
  rememberMe: boolean;
}

// Helpers for file I/O
function loadJson<T>(filePath: string, defaultValue: T): T {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(defaultValue, null, 2), 'utf-8');
      return defaultValue;
    }
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw) as T;
  } catch (err) {
    console.error(`Error loading ${filePath}:`, err);
    return defaultValue;
  }
}

function saveJson<T>(filePath: string, data: T): void {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error(`Error saving ${filePath}:`, err);
  }
}

// Password hashing helpers (scrypt + random salt)
function hashPassword(password: string, salt: string): string {
  return crypto.scryptSync(password, salt, 64).toString('hex');
}

function verifyPassword(password: string, salt: string, hash: string): boolean {
  try {
    const computed = crypto.scryptSync(password, salt, 64);
    const original = Buffer.from(hash, 'hex');
    if (computed.length !== original.length) return false;
    return crypto.timingSafeEqual(computed, original);
  } catch {
    return false;
  }
}

function generateSalt(): string {
  return crypto.randomBytes(32).toString('hex');
}

function generateSessionToken(): string {
  return crypto.randomBytes(48).toString('base64url');
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

// Initialize seed data if empty
function initializeDatabase() {
  const users = loadJson<StoredUser[]>(USERS_FILE, []);
  const credentials = loadJson<StoredCredential[]>(CREDENTIALS_FILE, []);

  if (users.length === 0) {
    console.log('Seeding initial CABO verified demo accounts with salted scrypt hashing...');
    
    // Seed 1: Rajesh Sharma (Seller)
    const sellerId = 'usr_seller_001';
    const sellerSalt = generateSalt();
    const sellerHash = hashPassword('Password123!', sellerSalt);
    const sellerUser: StoredUser = {
      id: sellerId,
      fullName: 'Rajesh Sharma',
      email: 'seller@cabo.energy',
      phone: '+91 98260 14820',
      role: 'seller',
      companyName: null,
      authProvider: 'email',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      city: 'Indore, Madhya Pradesh',
      nodeId: 'CABO-MP-0247',
      systemCapacityKw: 6.0,
      walletBalanceInr: 3880,
      totalEarningsInr: 18450,
      verifiedCreditsAccrued: 0.485,
      discomZone: 'MPPKVVCL (West Discom - Indore City Division)',
      avatarInitials: 'RS',
    };

    // Seed 2: Vikramaditya Singhania (Buyer)
    const buyerId = 'usr_buyer_001';
    const buyerSalt = generateSalt();
    const buyerHash = hashPassword('Password123!', buyerSalt);
    const buyerUser: StoredUser = {
      id: buyerId,
      fullName: 'Vikramaditya Singhania',
      email: 'buyer@cabo.energy',
      phone: '+91 98200 45210',
      role: 'buyer',
      companyName: 'Mahindra Heavy Industries ESG Desk',
      authProvider: 'email',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      city: 'Mumbai / Indore Office',
      walletBalanceInr: 450000,
      totalEarningsInr: 0,
      verifiedCreditsAccrued: 480.0,
      avatarInitials: 'VS',
    };

    users.push(sellerUser, buyerUser);
    credentials.push(
      { userId: sellerId, passwordHash: sellerHash, passwordSalt: sellerSalt },
      { userId: buyerId, passwordHash: buyerHash, passwordSalt: buyerSalt }
    );

    saveJson(USERS_FILE, users);
    saveJson(CREDENTIALS_FILE, credentials);
    saveJson(SESSIONS_FILE, []);
    console.log('Seed accounts initialized: seller@cabo.energy and buyer@cabo.energy');
  }
}

initializeDatabase();

// Clean up expired sessions periodically
setInterval(() => {
  try {
    const sessions = loadJson<StoredSession[]>(SESSIONS_FILE, []);
    const now = Date.now();
    const active = sessions.filter((s) => s.expiresAt > now);
    if (active.length !== sessions.length) {
      saveJson(SESSIONS_FILE, active);
    }
  } catch (err) {
    console.error('Error cleaning expired sessions:', err);
  }
}, 5 * 60 * 1000);

// ==========================================
// AUTH API ROUTES
// ==========================================

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// 1. REGISTER
app.post('/api/auth/register', (req, res) => {
  try {
    const { fullName, email, phone, password, role, companyName } = req.body;

    // Validate fields
    if (!fullName || !fullName.trim()) {
      return res.status(400).json({ success: false, error: 'Full name is required', field: 'fullName' });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ success: false, error: 'Email address is required', field: 'email' });
    }
    const cleanEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({ success: false, error: 'Please enter a valid email address', field: 'email' });
    }

    if (!phone || !phone.trim()) {
      return res.status(400).json({ success: false, error: 'Contact phone number is required', field: 'phone' });
    }
    // Check phone format (allow digits, +, -, spaces, parentheses, length 7 to 15)
    const phoneClean = phone.replace(/[\s\-\(\)]/g, '');
    if (phoneClean.length < 7 || phoneClean.length > 15) {
      return res.status(400).json({ success: false, error: 'Please enter a valid contact phone number', field: 'phone' });
    }

    if (!password || password.length < 8) {
      return res.status(400).json({ success: false, error: 'Password must be at least 8 characters long', field: 'password' });
    }

    if (role !== 'seller' && role !== 'buyer') {
      return res.status(400).json({ success: false, error: 'Account type must be either SELLER or BUYER', field: 'role' });
    }

    if (role === 'buyer' && (!companyName || !companyName.trim())) {
      return res.status(400).json({ success: false, error: 'Company / Organization name is required for Buyer accounts', field: 'companyName' });
    }

    // Check if email already registered
    const users = loadJson<StoredUser[]>(USERS_FILE, []);
    const existing = users.find((u) => u.email === cleanEmail);
    if (existing) {
      return res.status(409).json({
        success: false,
        error: `An account with this email is already registered as a ${existing.role.toUpperCase()}. Please log in instead.`,
        field: 'email',
      });
    }

    // Generate secure salt & scrypt hash
    const userId = `usr_${Date.now().toString(36)}_${crypto.randomBytes(4).toString('hex')}`;
    const salt = generateSalt();
    const hash = hashPassword(password, salt);

    const newUser: StoredUser = {
      id: userId,
      fullName: fullName.trim(),
      email: cleanEmail,
      phone: phone.trim(),
      role: role,
      companyName: role === 'buyer' && companyName ? companyName.trim() : null,
      authProvider: 'email',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      avatarInitials: getInitials(fullName),
      city: role === 'seller' ? 'Indore, Madhya Pradesh' : 'India',
      nodeId: role === 'seller' ? `CABO-MP-${Math.floor(100 + Math.random() * 900)}` : undefined,
      systemCapacityKw: role === 'seller' ? 5.0 : undefined,
      walletBalanceInr: role === 'seller' ? 0 : 100000,
      totalEarningsInr: 0,
      verifiedCreditsAccrued: 0,
    };

    // Save to user store
    users.push(newUser);
    saveJson(USERS_FILE, users);

    // Save credentials separately (passwords NEVER stored in plain text or in user object)
    const credentials = loadJson<StoredCredential[]>(CREDENTIALS_FILE, []);
    credentials.push({ userId, passwordHash: hash, passwordSalt: salt });
    saveJson(CREDENTIALS_FILE, credentials);

    // Create session (default 30 days for new signup)
    const sessionToken = generateSessionToken();
    const expiresAt = Date.now() + 30 * 24 * 60 * 60 * 1000;
    const sessions = loadJson<StoredSession[]>(SESSIONS_FILE, []);
    sessions.push({
      token: sessionToken,
      userId,
      role,
      expiresAt,
      createdAt: Date.now(),
      rememberMe: true,
    });
    saveJson(SESSIONS_FILE, sessions);

    return res.status(201).json({
      success: true,
      user: newUser,
      token: sessionToken,
    });
  } catch (err: any) {
    console.error('Registration error:', err);
    return res.status(500).json({ success: false, error: 'Server error processing registration. Please try again.' });
  }
});

// 2. LOGIN
app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password, role, rememberMe } = req.body;

    if (!email || !email.trim()) {
      return res.status(400).json({ success: false, error: 'Email address is required', field: 'email' });
    }
    if (!password) {
      return res.status(400).json({ success: false, error: 'Password is required', field: 'password' });
    }
    if (role !== 'seller' && role !== 'buyer') {
      return res.status(400).json({ success: false, error: 'Target role must be specified', field: 'role' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const users = loadJson<StoredUser[]>(USERS_FILE, []);
    const user = users.find((u) => u.email === cleanEmail);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'No CABO account found with this email address. Please check your email or create an account.',
        field: 'email',
      });
    }

    // Role check: enforce separation of Seller and Buyer accounts
    if (user.role !== role) {
      return res.status(403).json({
        success: false,
        error: `Access Denied: This email is registered as a ${user.role.toUpperCase()} account. Please switch to the ${user.role.toUpperCase()} login page.`,
        field: 'role',
      });
    }

    // Check credentials
    const credentials = loadJson<StoredCredential[]>(CREDENTIALS_FILE, []);
    const cred = credentials.find((c) => c.userId === user.id);

    if (!cred) {
      return res.status(401).json({
        success: false,
        error: 'Authentication record missing or registered via Google Sign-In. Please sign in with Google.',
        field: 'password',
      });
    }

    const isMatch = verifyPassword(password, cred.passwordSalt, cred.passwordHash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Incorrect password. Please verify your credentials or use Forgot Password.',
        field: 'password',
      });
    }

    // Session duration: 30 days if rememberMe, otherwise 24 hours
    const durationMs = rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000;
    const expiresAt = Date.now() + durationMs;
    const sessionToken = generateSessionToken();

    const sessions = loadJson<StoredSession[]>(SESSIONS_FILE, []);
    sessions.push({
      token: sessionToken,
      userId: user.id,
      role: user.role,
      expiresAt,
      createdAt: Date.now(),
      rememberMe: Boolean(rememberMe),
    });
    saveJson(SESSIONS_FILE, sessions);

    return res.json({
      success: true,
      user,
      token: sessionToken,
    });
  } catch (err: any) {
    console.error('Login error:', err);
    return res.status(500).json({ success: false, error: 'Server error processing authentication.' });
  }
});

// 3. GOOGLE SIGN-IN
app.post('/api/auth/google', (req, res) => {
  try {
    const { email, name, role, photoUrl } = req.body;

    if (!email || !email.trim()) {
      return res.status(400).json({ success: false, error: 'Google email address is required' });
    }
    if (role !== 'seller' && role !== 'buyer') {
      return res.status(400).json({ success: false, error: 'Valid role (seller/buyer) is required' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const users = loadJson<StoredUser[]>(USERS_FILE, []);
    let user = users.find((u) => u.email === cleanEmail);

    if (user) {
      // Existing user: check role
      if (user.role !== role) {
        return res.status(403).json({
          success: false,
          error: `This Google account is already registered as a ${user.role.toUpperCase()}. Please access via the ${user.role.toUpperCase()} portal.`,
        });
      }
    } else {
      // First-time Google user: create their CABO profile in the database
      const userId = `usr_g_${Date.now().toString(36)}_${crypto.randomBytes(3).toString('hex')}`;
      user = {
        id: userId,
        fullName: name && name.trim() ? name.trim() : cleanEmail.split('@')[0],
        email: cleanEmail,
        phone: '+91 98000 00000',
        role: role,
        companyName: role === 'buyer' ? 'Institutional Carbon Buyer' : null,
        authProvider: 'google',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        avatarInitials: getInitials(name || cleanEmail),
        city: role === 'seller' ? 'Indore, Madhya Pradesh' : 'India',
        nodeId: role === 'seller' ? `CABO-MP-${Math.floor(100 + Math.random() * 900)}` : undefined,
        systemCapacityKw: role === 'seller' ? 6.0 : undefined,
        walletBalanceInr: role === 'seller' ? 0 : 250000,
        totalEarningsInr: 0,
        verifiedCreditsAccrued: 0,
      };

      users.push(user);
      saveJson(USERS_FILE, users);
    }

    // Issue session token (30 days persistence)
    const sessionToken = generateSessionToken();
    const expiresAt = Date.now() + 30 * 24 * 60 * 60 * 1000;
    const sessions = loadJson<StoredSession[]>(SESSIONS_FILE, []);
    sessions.push({
      token: sessionToken,
      userId: user.id,
      role: user.role,
      expiresAt,
      createdAt: Date.now(),
      rememberMe: true,
    });
    saveJson(SESSIONS_FILE, sessions);

    return res.json({
      success: true,
      user,
      token: sessionToken,
    });
  } catch (err: any) {
    console.error('Google auth error:', err);
    return res.status(500).json({ success: false, error: 'Server error processing Google authentication.' });
  }
});

// 4. ME (Validate token and fetch current profile)
app.get('/api/auth/me', (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, error: 'No authorization session token provided' });
    }

    const token = authHeader.split(' ')[1];
    const sessions = loadJson<StoredSession[]>(SESSIONS_FILE, []);
    const session = sessions.find((s) => s.token === token);

    if (!session) {
      return res.status(401).json({ success: false, error: 'Session invalid or expired' });
    }

    if (Date.now() > session.expiresAt) {
      // Remove expired
      const remaining = sessions.filter((s) => s.token !== token);
      saveJson(SESSIONS_FILE, remaining);
      return res.status(401).json({ success: false, error: 'Session expired. Please log in again.' });
    }

    const users = loadJson<StoredUser[]>(USERS_FILE, []);
    const user = users.find((u) => u.id === session.userId);

    if (!user) {
      return res.status(404).json({ success: false, error: 'User record not found' });
    }

    return res.json({
      success: true,
      user,
    });
  } catch (err: any) {
    console.error('Get profile error:', err);
    return res.status(500).json({ success: false, error: 'Server error validating session.' });
  }
});

// 5. LOGOUT
app.post('/api/auth/logout', (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const sessions = loadJson<StoredSession[]>(SESSIONS_FILE, []);
      const remaining = sessions.filter((s) => s.token !== token);
      saveJson(SESSIONS_FILE, remaining);
    }
    return res.json({ success: true, message: 'Logged out successfully' });
  } catch (err: any) {
    console.error('Logout error:', err);
    return res.status(500).json({ success: false, error: 'Server error during logout.' });
  }
});

// Start server with Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CABO Full-Stack Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
