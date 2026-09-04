import {
  AuthResponse,
  GoogleAuthPayload,
  LoginPayload,
  RegisterPayload,
  User,
} from '../types/auth';
import { demoAuth } from './demoAuth';

export const authApi = {
  getStoredToken(): string | null {
    const user = demoAuth.getStoredSession();
    return user ? `demo_session_${user.id}` : null;
  },

  setStoredToken(_token: string, _rememberMe: boolean = true): void {
    // Managed directly by demoAuth
  },

  clearStoredToken(): void {
    demoAuth.clearStoredSession();
  },

  async register(payload: RegisterPayload): Promise<AuthResponse> {
    return demoAuth.register(payload);
  },

  async login(payload: LoginPayload): Promise<AuthResponse> {
    return demoAuth.login(payload);
  },

  async googleAuth(payload: GoogleAuthPayload): Promise<AuthResponse> {
    // Real Google OAuth is not configured; inform user cleanly
    return {
      success: false,
      error: 'Google Sign-In is coming soon. Please use Email and Password for demo access.',
    };
  },

  async getMe(): Promise<{ success: boolean; user?: User; error?: string }> {
    return demoAuth.getCurrentUser();
  },

  async getCurrentUser(): Promise<{ success: boolean; user?: User; error?: string }> {
    return demoAuth.getCurrentUser();
  },

  async logout(): Promise<void> {
    await demoAuth.logout();
  },
};

