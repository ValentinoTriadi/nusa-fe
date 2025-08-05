import { LoginCredentials, Session, SessionUser } from '@/types/auth.type';
import { RegisterFormType } from '@/types/form/register';

import axiosClient from './axios-client';

export interface AuthResponse {
  user: SessionUser;
  session: Session;
}

// Auth utility class for Better Auth
export class AuthService {
  // Login with Better Auth
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await axiosClient.post<AuthResponse>(
      '/auth/sign-in/email',
      credentials,
      {
        withCredentials: true, // Important for cookies
      },
    );

    console.log('Login response:', response);

    return response.data;
  }

  // Register new user with Better Auth
  static async register(userData: RegisterFormType): Promise<AuthResponse> {
    const response = await axiosClient.post<AuthResponse>(
      '/auth/sign-up/email',
      {
        email: userData.email,
        password: userData.password,
        name: userData.ownerName,
        address: userData.address,
        storeName: userData.storeName,
        businessId: userData.businessId,
        businessType: userData.businessType,
        city: userData.city,
        province: userData.province,
        phoneNumber: userData.phoneNumber,
      },
      {
        withCredentials: true, // Important for cookies
      },
    );
    return response.data;
  }

  // Logout with Better Auth
  static async logout(): Promise<void> {
    try {
      await axiosClient.post(
        '/auth/sign-out',
        {},
        {
          withCredentials: true, // Important for cookies
        },
      );
    } catch (error) {
      console.log('Logout API call failed:', error);
      throw error;
    }
  }

  // Get current session/user from Better Auth
  static async getSession(): Promise<{
    user: SessionUser;
    session: Session;
  } | null> {
    try {
      const response = await axiosClient.get<{
        user: SessionUser;
        session: Session;
      }>('/auth/get-session', {
        withCredentials: true, // Important for cookies
      });
      return response.data;
    } catch (error) {
      console.log('Failed to get session:', error);
      return null;
    }
  }

  // Verify if user is authenticated by checking session
  static async isAuthenticated(): Promise<boolean> {
    try {
      const session = await this.getSession();
      return !!session?.user;
    } catch (_error) {
      return false;
    }
  }

  // Initialize auth configuration for Better Auth
  static initializeAuth(): void {
    // Configure axios to always send cookies
    axiosClient.defaults.withCredentials = true;

    // Add CSRF token if needed (Better Auth might use it)
    const csrfToken = this.getCSRFToken();
    if (csrfToken) {
      axiosClient.defaults.headers.common['X-CSRF-Token'] = csrfToken;
    }
  }

  // Get CSRF token from meta tag or cookie
  static getCSRFToken(): string | null {
    // Try to get from meta tag first
    const metaTag = document.querySelector(
      'meta[name="csrf-token"]',
    ) as HTMLMetaElement;
    if (metaTag) {
      return metaTag.content;
    }

    // Try to get from cookie
    const match = document.cookie.match(/csrf-token=([^;]*)/);
    return match ? decodeURIComponent(match[1]) : null;
  }

  // For SSR: Set auth from server-side cookies (if needed)
  static setAuthFromCookie(cookie: string): void {
    axiosClient.defaults.headers.common['Cookie'] = cookie;
  }

  // Send password reset email
  static async forgotPassword(email: string): Promise<void> {
    await axiosClient.post(
      '/auth/forget-password',
      { email },
      {
        withCredentials: true,
      },
    );
  }

  // Reset password with token
  static async resetPassword(token: string, password: string): Promise<void> {
    await axiosClient.post(
      '/auth/reset-password',
      {
        token,
        password,
      },
      {
        withCredentials: true,
      },
    );
  }

  // Verify email with token
  static async verifyEmail(token: string): Promise<void> {
    await axiosClient.post(
      '/auth/verify-email',
      { token },
      {
        withCredentials: true,
      },
    );
  }
}

export default AuthService;
