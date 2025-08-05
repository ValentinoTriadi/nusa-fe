/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter } from 'next/navigation';

import {
  sessionStorage,
  useSessionContext,
} from '@/components/providers/session-provider';

import { queryKeys } from '@/lib/api';
import AuthService, { type AuthResponse } from '@/lib/auth';

import { useApiMutation, useQueryClientInstance } from '@/hooks/use-api';
import { LoginCredentials } from '@/types/auth.type';
import { RegisterFormType } from '@/types/form/register';

// Hook to get session from context (no API call needed)
export function useSession() {
  const { session, isLoading, refreshSession } = useSessionContext();

  return {
    data: session,
    isLoading,
    refetch: refreshSession,
    isError: false,
    error: null,
  };
}

// Hook for login mutation with Better Auth
export function useLogin() {
  const router = useRouter();
  const queryClient = useQueryClientInstance();
  const { setSession } = useSessionContext();

  return useApiMutation(
    (credentials: LoginCredentials) => AuthService.login(credentials),
    {
      onSuccess: (data: AuthResponse) => {
        // Update session context
        setSession({
          user: data.user,
          session: data.session,
        });

        // Set user data in cache
        queryClient.setQueryData(queryKeys.user.profile(), {
          user: data.user,
          session: data.session,
        });

        // Trigger login event for other tabs
        sessionStorage.triggerLogin();

        // Redirect to dashboard or intended page
        router.push('/home');
      },
      onError: (error: any) => {
        console.log(
          'Login failed:',
          error.response?.data?.message || error.message,
        );
      },
    },
  );
}

// Hook for register mutation with Better Auth
export function useRegister() {
  const router = useRouter();
  const queryClient = useQueryClientInstance();
  const { setSession } = useSessionContext();

  return useApiMutation(
    (userData: RegisterFormType) => AuthService.register(userData),
    {
      onSuccess: (data: AuthResponse) => {
        // Update session context
        setSession({
          user: data.user,
          session: data.session,
        });

        // Set user data in cache
        queryClient.setQueryData(queryKeys.user.profile(), {
          user: data.user,
          session: data.session,
        });

        // Trigger login event for other tabs
        sessionStorage.triggerLogin();

        // Redirect to dashboard
        router.push('/home');

        console.log('Registration successful:', data.user.name);
      },
      onError: (error: any) => {
        console.log(
          'Registration failed:',
          error.response?.data?.message || error.message,
        );
      },
    },
  );
}

// Hook for logout mutation with Better Auth
export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClientInstance();
  const { clearSession } = useSessionContext();

  return useApiMutation(() => AuthService.logout(), {
    onSuccess: () => {
      // Clear session context
      clearSession();

      // Clear all cached data
      queryClient.clear();

      // Trigger logout event for other tabs
      sessionStorage.triggerLogout();

      // Redirect to login
      router.push('/auth/login');

      console.log('Logout successful');
    },
    onError: (error: any) => {
      console.log('Logout failed:', error);
      // Even if logout API fails, clear local data and redirect
      clearSession();
      queryClient.clear();
      sessionStorage.triggerLogout();
      router.push('/auth/login');
    },
  });
}

// Hook to check authentication status with Better Auth
export function useAuth() {
  const { session, isLoading, isAuthenticated, refreshSession } =
    useSessionContext();

  return {
    user: session?.user,
    session: session?.session,
    isAuthenticated,
    isLoading,
    isError: false,
    error: null,
    refetch: refreshSession,
  };
}

// Hook for forgot password
export function useForgotPassword() {
  return useApiMutation((email: string) => AuthService.forgotPassword(email), {
    onSuccess: () => {
      console.log('Password reset email sent');
    },
    onError: (error: any) => {
      console.log(
        'Failed to send password reset email:',
        error.response?.data?.message || error.message,
      );
    },
  });
}

// Hook for reset password
export function useResetPassword() {
  const router = useRouter();

  return useApiMutation(
    ({ token, password }: { token: string; password: string }) =>
      AuthService.resetPassword(token, password),
    {
      onSuccess: () => {
        console.log('Password reset successful');
        router.push('/auth/login');
      },
      onError: (error: any) => {
        console.log(
          'Password reset failed:',
          error.response?.data?.message || error.message,
        );
      },
    },
  );
}

// Hook for email verification
export function useVerifyEmail() {
  const router = useRouter();

  return useApiMutation((token: string) => AuthService.verifyEmail(token), {
    onSuccess: () => {
      console.log('Email verified successfully');
      router.push('/home');
    },
    onError: (error: any) => {
      console.log(
        'Email verification failed:',
        error.response?.data?.message || error.message,
      );
    },
  });
}
