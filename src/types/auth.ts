export type UserRole = 'seller' | 'buyer';

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  companyName: string | null;
  authProvider: 'email' | 'google';
  createdAt: string;
  updatedAt: string;
  
  // Supplementary CABO MRV profile attributes for dashboards
  city?: string;
  nodeId?: string;
  systemCapacityKw?: number;
  walletBalanceInr?: number;
  totalEarningsInr?: number;
  verifiedCreditsAccrued?: number;
  carbonSoldTco2e?: number;
  discomZone?: string;
  avatarInitials?: string;
}

// Backward compatibility alias if needed
export type UserProfile = User;

export interface AuthSession {
  token: string;
  userId: string;
  role: UserRole;
  expiresAt: number;
  createdAt: number;
  rememberMe: boolean;
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole;
  companyName?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
  role: UserRole;
  rememberMe?: boolean;
}

export interface GoogleAuthPayload {
  email: string;
  name: string;
  role: UserRole;
  googleId?: string;
  photoUrl?: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  error?: string;
  field?: string;
}
