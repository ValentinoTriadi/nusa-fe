'use client';

import React, {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import AuthService from '@/lib/auth';

import { type Session, type SessionUser } from '@/types/auth.type';

// Types for session context
interface SessionData {
  user: SessionUser;
  session: Session;
}

interface SessionContextType {
  session: SessionData | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  refreshSession: () => Promise<void>;
  clearSession: () => void;
  setSession: (sessionData: SessionData) => void;
}

// Create the context
const SessionContext = createContext<SessionContextType | undefined>(undefined);

// Session provider component
interface SessionProviderProps {
  children: ReactNode;
}

export function SessionProvider({ children }: SessionProviderProps) {
  const [session, setSessionData] = useState<SessionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Function to fetch session from backend
  const fetchSession = async () => {
    try {
      setIsLoading(true);
      const sessionData = await AuthService.getSession();
      setSessionData(sessionData);
    } catch (error) {
      console.error('Failed to fetch session:', error);
      setSessionData(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to refresh session (can be called manually)
  const refreshSession = async () => {
    await fetchSession();
  };

  // Function to clear session
  const clearSession = () => {
    setSessionData(null);
  };

  // Function to set session (called after login)
  const setSession = (sessionData: SessionData) => {
    setSessionData(sessionData);
  };

  // Computed values
  const isAuthenticated = !!session?.user;

  // Fetch session on mount
  useEffect(() => {
    fetchSession();
  }, []);

  // Listen for storage events (if user logs out in another tab)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      // If this is a logout event, clear session
      if (e.key === 'logout-event') {
        clearSession();
      }
      // If this is a login event, refresh session
      if (e.key === 'login-event') {
        refreshSession();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Listen for visibility change to refresh session when user comes back
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && session) {
        // Refresh session when user comes back to the tab
        refreshSession();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () =>
      document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [session]);

  const value: SessionContextType = {
    session,
    isLoading,
    isAuthenticated,
    refreshSession,
    clearSession,
    setSession,
  };

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

// Custom hook to use session context
export function useSessionContext(): SessionContextType {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSessionContext must be used within a SessionProvider');
  }
  return context;
}

// Utility functions for cross-tab communication
export const sessionStorage = {
  triggerLogout: () => {
    localStorage.setItem('logout-event', Date.now().toString());
    localStorage.removeItem('logout-event');
  },
  triggerLogin: () => {
    localStorage.setItem('login-event', Date.now().toString());
    localStorage.removeItem('login-event');
  },
};
