import { useRouter } from 'next/navigation';

import { queryKeys } from '@/lib/api';
import AuthService, { type AuthResponse } from '@/lib/auth';

import {
  useApiMutation,
  useApiQuery,
  useQueryClientInstance,
} from '@/hooks/use-api';
import { LoginCredentials } from '@/types/auth.type';
import { RegisterFormType } from '@/types/form/register';

// Hook to get current user session from Better Auth
export function useSession() {
  return useApiQuery(queryKeys.user.profile(), () => AuthService.getSession(), {
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1, // Don't retry much on session checks
    refetchOnWindowFocus: true, // Check session when user comes back
  });
}

// Hook for login mutation with Better Auth
export function useLogin() {
  const router = useRouter();
  const queryClient = useQueryClientInstance();

  return useApiMutation(
    (credentials: LoginCredentials) => AuthService.login(credentials),
    {
      onSuccess: (data: AuthResponse) => {
        // Set user data in cache
        queryClient.setQueryData(queryKeys.user.profile(), {
          user: data.user,
          session: data.session,
        });

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

  return useApiMutation(
    (userData: RegisterFormType) => AuthService.register(userData),
    {
      onSuccess: (data: AuthResponse) => {
        // Set user data in cache
        queryClient.setQueryData(queryKeys.user.profile(), {
          user: data.user,
          session: data.session,
        });

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

  return useApiMutation(() => AuthService.logout(), {
    onSuccess: () => {
      // Clear all cached data
      queryClient.clear();

      // Redirect to login
      router.push('/auth/login');

      console.log('Logout successful');
    },
    onError: (error: any) => {
      console.log('Logout failed:', error);
      // Even if logout API fails, clear local data and redirect
      queryClient.clear();
      router.push('/auth/login');
    },
  });
}

// Hook to check authentication status with Better Auth
export function useAuth() {
  const sessionQuery = useSession();

  return {
    user: sessionQuery.data?.user,
    session: sessionQuery.data?.session,
    isAuthenticated: !!sessionQuery.data?.user,
    isLoading: sessionQuery.isLoading,
    isError: sessionQuery.isError,
    error: sessionQuery.error,
    refetch: sessionQuery.refetch,
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
