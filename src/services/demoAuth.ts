import { User, UserRole, AuthResponse, RegisterPayload, LoginPayload } from '../types/auth';

const DEMO_USERS_STORAGE_KEY = 'cabo_demo_users';
const DEMO_SESSION_STORAGE_KEY = 'cabo_demo_session';

interface StoredDemoUser extends User {
  passwordHash: string;
}

// Browser-safe, non-blocking SHA-256 password hashing
async function hashDemoPassword(password: string): Promise<string> {
  try {
    if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
      const encoder = new TextEncoder();
      const data = encoder.encode(password + '_cabo_demo_salt_v1');
      const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    }
  } catch (e) {
    console.warn('SubtleCrypto error, falling back to local digest', e);
  }
  // Deterministic local string hash fallback
  let hash = 0;
  const str = password + '_cabo_salt_v1';
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return 'demo_hash_' + Math.abs(hash).toString(16);
}

// Pre-seeded fallback demo accounts as required by specification
const INITIAL_DEMO_USERS: StoredDemoUser[] = [
  // 1. Required Seller Fallback: seller@cabo.demo / demo123
  {
    id: 'usr_seller_demo_01',
    fullName: 'Rajesh Sharma (Demo)',
    email: 'seller@cabo.demo',
    phone: '9999999999',
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
    carbonSoldTco2e: 12.4,
    discomZone: 'MPPKVVCL (West Discom - Indore)',
    avatarInitials: 'RS',
    passwordHash: '', // Populated on initialize
  },
  // 2. Required Buyer Fallback: buyer@cabo.demo / demo123
  {
    id: 'usr_buyer_demo_02',
    fullName: 'Aditi Deshmukh (Demo)',
    email: 'buyer@cabo.demo',
    phone: '9811122334',
    role: 'buyer',
    companyName: 'Tata Cleantech & ESG Desk',
    authProvider: 'email',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    avatarInitials: 'AD',
    passwordHash: '',
  },
  // 3. Convenience Auto-fill accounts: seller@cabo.energy & buyer@cabo.energy
  {
    id: 'usr_seller_cabo_03',
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
    carbonSoldTco2e: 12.4,
    discomZone: 'MPPKVVCL (West Discom - Indore)',
    avatarInitials: 'RS',
    passwordHash: '',
  },
  {
    id: 'usr_buyer_cabo_04',
    fullName: 'Aditi Deshmukh',
    email: 'buyer@cabo.energy',
    phone: '+91 98111 22334',
    role: 'buyer',
    companyName: 'Tata Cleantech Capital',
    authProvider: 'email',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    avatarInitials: 'AD',
    passwordHash: '',
  },
];

class DemoAuthService {
  private initialized = false;

  private async initializeSeedData(): Promise<void> {
    if (this.initialized) return;
    this.initialized = true;

    try {
      const stored = localStorage.getItem(DEMO_USERS_STORAGE_KEY);
      let users: StoredDemoUser[] = stored ? JSON.parse(stored) : [];

      // Compute hashes for initial seeds
      const demo123Hash = await hashDemoPassword('demo123');
      const pass123Hash = await hashDemoPassword('Password123!');

      let modified = false;

      for (const seed of INITIAL_DEMO_USERS) {
        const existingIdx = users.findIndex(
          (u) => u.email.toLowerCase() === seed.email.toLowerCase()
        );
        const expectedHash = seed.email.includes('.demo') ? demo123Hash : pass123Hash;

        if (existingIdx === -1) {
          users.push({
            ...seed,
            passwordHash: expectedHash,
          });
          modified = true;
        } else if (!users[existingIdx].passwordHash) {
          users[existingIdx].passwordHash = expectedHash;
          modified = true;
        }
      }

      if (modified || !stored) {
        localStorage.setItem(DEMO_USERS_STORAGE_KEY, JSON.stringify(users));
      }
    } catch (e) {
      console.warn('Error seeding demo accounts in localStorage:', e);
    }
  }

  private getStoredUsers(): StoredDemoUser[] {
    try {
      const raw = localStorage.getItem(DEMO_USERS_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  private saveStoredUsers(users: StoredDemoUser[]): void {
    try {
      localStorage.setItem(DEMO_USERS_STORAGE_KEY, JSON.stringify(users));
    } catch (e) {
      console.error('Failed to save demo users to localStorage:', e);
    }
  }

  public getStoredSession(): User | null {
    try {
      // Check localStorage first
      const local = localStorage.getItem(DEMO_SESSION_STORAGE_KEY);
      if (local) {
        const parsed = JSON.parse(local);
        if (parsed && parsed.email && parsed.role) {
          return parsed;
        }
      }
      // Check sessionStorage fallback
      const session = sessionStorage.getItem(DEMO_SESSION_STORAGE_KEY);
      if (session) {
        const parsed = JSON.parse(session);
        if (parsed && parsed.email && parsed.role) {
          return parsed;
        }
      }
      return null;
    } catch {
      return null;
    }
  }

  public setStoredSession(user: User, rememberMe: boolean = true): void {
    try {
      const serialized = JSON.stringify(user);
      if (rememberMe) {
        localStorage.setItem(DEMO_SESSION_STORAGE_KEY, serialized);
        sessionStorage.removeItem(DEMO_SESSION_STORAGE_KEY);
      } else {
        sessionStorage.setItem(DEMO_SESSION_STORAGE_KEY, serialized);
        localStorage.removeItem(DEMO_SESSION_STORAGE_KEY);
      }
    } catch (e) {
      console.error('Failed to store demo session:', e);
    }
  }

  public clearStoredSession(): void {
    try {
      localStorage.removeItem(DEMO_SESSION_STORAGE_KEY);
      sessionStorage.removeItem(DEMO_SESSION_STORAGE_KEY);
      // Clean legacy keys if present
      localStorage.removeItem('cabo_auth_token');
      sessionStorage.removeItem('cabo_auth_token');
    } catch (e) {
      console.error('Failed to clear demo session:', e);
    }
  }

  // Permissive email format validator matching specification:
  // Text before @, text after @, valid-looking domain
  public isValidEmail(email: string): boolean {
    if (!email) return false;
    const trimmed = email.trim();
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
  }

  public async register(payload: RegisterPayload): Promise<AuthResponse> {
    await this.initializeSeedData();

    const emailClean = (payload.email || '').trim().toLowerCase();
    const fullNameClean = (payload.fullName || '').trim();
    const phoneClean = (payload.phone || '').trim();
    const password = payload.password || '';

    // 1. Email format validation
    if (!emailClean) {
      return {
        success: false,
        error: 'Email address is required',
        field: 'email',
      };
    }
    if (!this.isValidEmail(emailClean)) {
      return {
        success: false,
        error: 'Please enter a valid email address (e.g. name@domain.com)',
        field: 'email',
      };
    }

    // 2. Full Name validation
    if (!fullNameClean) {
      return {
        success: false,
        error: 'Full name is required',
        field: 'fullName',
      };
    }

    // 3. Contact Number validation
    if (!phoneClean) {
      return {
        success: false,
        error: 'Contact number is required',
        field: 'phone',
      };
    }

    // 4. Password validation (Demo rule: min 6 characters)
    if (!password) {
      return {
        success: false,
        error: 'Password is required',
        field: 'password',
      };
    }
    if (password.length < 6) {
      return {
        success: false,
        error: 'Password must be at least 6 characters for demo mode',
        field: 'password',
      };
    }

    // 5. Buyer Company Name validation
    if (payload.role === 'buyer' && (!payload.companyName || !payload.companyName.trim())) {
      return {
        success: false,
        error: 'Company / Organization Name is required',
        field: 'companyName',
      };
    }

    // 6. Check if email already registered
    const users = this.getStoredUsers();
    const existing = users.find((u) => u.email.toLowerCase() === emailClean);
    if (existing) {
      return {
        success: false,
        error: 'This email is already registered. Please login or use a different email.',
        field: 'email',
      };
    }

    // 7. Hash password
    const passwordHash = await hashDemoPassword(password);

    // 8. Construct user model with realistic CABO MRV attributes
    const initials =
      fullNameClean
        .split(' ')
        .filter(Boolean)
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase() || (payload.role === 'seller' ? 'SL' : 'BY');

    const newUser: StoredDemoUser = {
      id: `usr_${payload.role}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      fullName: fullNameClean,
      email: emailClean,
      phone: phoneClean,
      role: payload.role,
      companyName: payload.role === 'buyer' ? (payload.companyName?.trim() || 'Enterprise Desk') : null,
      authProvider: 'email',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      avatarInitials: initials,
      passwordHash,
      // Seller-specific defaults for dashboard telemetry
      city: payload.role === 'seller' ? 'Indore, Madhya Pradesh' : undefined,
      nodeId: payload.role === 'seller' ? `CABO-MP-${Math.floor(1000 + Math.random() * 9000)}` : undefined,
      systemCapacityKw: payload.role === 'seller' ? 6.0 : undefined,
      walletBalanceInr: payload.role === 'seller' ? 3880 : undefined,
      totalEarningsInr: payload.role === 'seller' ? 18450 : undefined,
      verifiedCreditsAccrued: payload.role === 'seller' ? 0.485 : undefined,
      carbonSoldTco2e: payload.role === 'seller' ? 12.4 : undefined,
      discomZone: payload.role === 'seller' ? 'MPPKVVCL (West Discom - Indore)' : undefined,
    };

    // 9. Save user account to demo storage
    users.push(newUser);
    this.saveStoredUsers(users);

    // 10. Automatically establish active session
    const { passwordHash: _, ...publicUser } = newUser;
    this.setStoredSession(publicUser, true);

    return {
      success: true,
      user: publicUser,
      token: `demo_token_${Date.now()}_${publicUser.id}`,
    };
  }

  public async login(payload: LoginPayload): Promise<AuthResponse> {
    await this.initializeSeedData();

    const emailClean = (payload.email || '').trim().toLowerCase();
    const password = payload.password || '';
    const requestedRole = payload.role;

    // 1. Basic field checks
    if (!emailClean) {
      return {
        success: false,
        error: 'Email address is required',
        field: 'email',
      };
    }
    if (!this.isValidEmail(emailClean)) {
      return {
        success: false,
        error: 'Please enter a valid email address (e.g. name@domain.com)',
        field: 'email',
      };
    }

    if (!password) {
      return {
        success: false,
        error: 'Password is required',
        field: 'password',
      };
    }

    // 2. Lookup account
    const users = this.getStoredUsers();
    const account = users.find((u) => u.email.toLowerCase() === emailClean);

    // If user does not exist
    if (!account) {
      return {
        success: false,
        error: 'Account not found. Please create an account first.',
        field: 'email',
      };
    }

    // 3. Strict Role Mismatch Check
    if (account.role !== requestedRole) {
      if (account.role === 'seller') {
        return {
          success: false,
          error: 'This account is registered as a Seller. Please use Seller Login.',
          field: 'role',
        };
      } else {
        return {
          success: false,
          error: 'This account is registered as a Buyer. Please use Buyer Login.',
          field: 'role',
        };
      }
    }

    // 4. Password validation
    const inputHash = await hashDemoPassword(password);
    // Allow fallback match if pre-seeded account or hash matched
    const isMatched =
      account.passwordHash === inputHash ||
      (account.email === 'seller@cabo.demo' && password === 'demo123') ||
      (account.email === 'buyer@cabo.demo' && password === 'demo123') ||
      (account.email === 'seller@cabo.energy' && (password === 'Password123!' || password === 'demo123')) ||
      (account.email === 'buyer@cabo.energy' && (password === 'Password123!' || password === 'demo123'));

    if (!isMatched) {
      return {
        success: false,
        error: 'Incorrect password. Please try again.',
        field: 'password',
      };
    }

    // 5. Successful login -> Persist session
    const { passwordHash: _, ...publicUser } = account;
    this.setStoredSession(publicUser, payload.rememberMe !== false);

    return {
      success: true,
      user: publicUser,
      token: `demo_token_${Date.now()}_${publicUser.id}`,
    };
  }

  public async getCurrentUser(): Promise<{ success: boolean; user?: User; error?: string }> {
    await this.initializeSeedData();
    const sessionUser = this.getStoredSession();
    if (sessionUser) {
      return {
        success: true,
        user: sessionUser,
      };
    }
    return {
      success: false,
      error: 'No active demo session',
    };
  }

  public async logout(): Promise<void> {
    this.clearStoredSession();
  }
}

export const demoAuth = new DemoAuthService();
