import { useSessionContext } from '@/components/providers/session-provider';

// Enhanced hook that provides both context data and server refresh capability
export function useSessionData() {
  const context = useSessionContext();

  return {
    // Session data from context (no API call)
    user: context.session?.user,
    session: context.session?.session,

    // State flags
    isAuthenticated: context.isAuthenticated,
    isLoading: context.isLoading,

    // Actions
    refreshFromServer: context.refreshSession, // Fetch fresh data from server
    clearSession: context.clearSession, // Clear session data
    setSession: context.setSession, // Set session data manually
  };
}

// Simple hook to get user data (most common use case)
export function useUser() {
  const { session, isAuthenticated, isLoading } = useSessionContext();

  return {
    user: session?.user,
    isAuthenticated,
    isLoading,
  };
}

// Hook to check if user has specific business type or properties
export function useUserProfile() {
  const { session } = useSessionContext();
  const user = session?.user;

  const hasBusinessType = (businessType: string) => {
    return user?.businessType === businessType;
  };

  const isEmailVerified = () => {
    return user?.emailVerified || false;
  };

  return {
    hasBusinessType,
    isEmailVerified,
    businessType: user?.businessType,
    storeName: user?.storeName,
    city: user?.city,
    province: user?.province,
  };
}
