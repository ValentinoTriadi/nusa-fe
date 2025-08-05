# TanStack Query + Axios + Better Auth Setup Guide

This project is now configured with TanStack Query, Axios HTTP client, and Better Auth for efficient server state management and authentication.

## 📁 File Structure

```
src/
├── components/
│   ├── providers/
│   │   └── query-provider.tsx     # QueryClient provider setup
│   └── examples/
│       ├── collaboration-example.tsx  # Example component using queries
│       └── auth-example.tsx       # Better Auth example
├── hooks/
│   ├── use-api.tsx               # Custom hooks for API calls
│   └── api/
│       ├── use-collaborations.tsx # Example API hooks
│       └── use-auth.tsx          # Better Auth hooks
└── lib/
    ├── axios-client.ts           # Axios singleton (Better Auth ready)
    ├── api.ts                    # API utilities and query keys
    └── auth.ts                   # Better Auth service
```

## � Better Auth Integration

### 1. Authentication Configuration

The setup is configured for Better Auth's cookie-based authentication:

- **Automatic Cookie Handling**: `withCredentials: true` on all requests
- **CSRF Protection**: Automatic CSRF token injection
- **Session Management**: Server-side session handling
- **No Token Storage**: Authentication state handled by Better Auth cookies

```tsx
import { useAuth, useLogin, useLogout } from '@/hooks/api/use-auth';

function AuthComponent() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const login = useLogin();
  const logout = useLogout();

  if (isLoading) return <div>Loading...</div>;

  if (!isAuthenticated) {
    return (
      <button
        onClick={() =>
          login.mutate({ email: 'user@example.com', password: 'password' })
        }
      >
        Login
      </button>
    );
  }

  return (
    <div>
      <p>Welcome, {user?.name}!</p>
      <button onClick={() => logout.mutate()}>Logout</button>
    </div>
  );
}
```

### 2. API Endpoints for Better Auth

The authentication service is configured for Better Auth's default endpoints:

- **Login**: `POST /auth/sign-in/email`
- **Register**: `POST /auth/sign-up/email`
- **Logout**: `POST /auth/sign-out`
- **Session**: `GET /auth/get-session`
- **Password Reset**: `POST /auth/forget-password`
- **Email Verification**: `POST /auth/verify-email`

## 🔐 Session Context Integration

### Session Context Benefits

The session context provides:

- **No API calls for session access** - Session data is stored in context
- **Automatic sync** - All components use the same session state
- **Smart updates** - Context updates on login/logout/refresh
- **Cross-tab sync** - Session changes sync across browser tabs
- **Background refresh** - Auto-refresh when user returns to tab

### 1. Using Session Data (Recommended)

```tsx
import { useAuth, useUser, useSessionData } from '@/hooks';

function ProfileComponent() {
  // Method 1: Simple user access (most common)
  const { user, isAuthenticated, isLoading } = useUser();

  // Method 2: Full auth data (compatible with old code)
  const { user, isAuthenticated, isLoading } = useAuth();

  // Method 3: Enhanced session control
  const { user, refreshFromServer, clearSession } = useSessionData();

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <div>Please login</div>;

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <p>Store: {user.storeName}</p>
      {/* Session data available instantly - no API call! */}
    </div>
  );
}
```

### 2. Session Management

```tsx
import { useAuth, useLogin, useLogout } from '@/hooks/api/use-auth';

function AuthComponent() {
  const { user, isAuthenticated } = useAuth();
  const login = useLogin();
  const logout = useLogout();

  const handleLogin = () => {
    login.mutate(
      { email: 'user@example.com', password: 'password' },
      {
        onSuccess: () => {
          // Context automatically updates!
          // All components instantly see the new session
        },
      },
    );
  };

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => {
        // Context automatically clears!
        // All components instantly see the logout
      },
    });
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Logged in as: {user.name}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}
```

### 3. Manual Session Control

```tsx
import { useSessionData } from '@/hooks/use-session-data';

function AdminPanel() {
  const { user, refreshFromServer, clearSession } = useSessionData();

  const handleRefreshUserData = async () => {
    // Fetch fresh session data from server
    await refreshFromServer();
    console.log('Session refreshed!');
  };

  const handleForceLogout = () => {
    // Manually clear session (emergency logout)
    clearSession();
  };

  return (
    <div>
      <button onClick={handleRefreshUserData}>Refresh User Data</button>
      <button onClick={handleForceLogout}>Force Logout</button>
    </div>
  );
}
```

### 3. API Queries with Axios

```tsx
import { api, queryKeys } from '@/lib/api';

import { useApiQuery } from '@/hooks/use-api';

function UserProfile() {
  const { data, isLoading, error } = useApiQuery(
    queryKeys.user.profile(),
    () => api.get('/user/profile'), // Uses axios client automatically
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>Welcome, {data.name}!</div>;
}
```

### 4. Mutations with Automatic Cache Updates

```tsx
import { api, queryKeys } from '@/lib/api';

import { useApiMutation, useQueryClientInstance } from '@/hooks/use-api';

function CreateUserForm() {
  const queryClient = useQueryClientInstance();

  const createUser = useApiMutation(
    (userData) => api.post('/users', userData), // Uses axios client
    {
      onSuccess: () => {
        // Invalidate users list to refetch
        queryClient.invalidateQueries({
          queryKey: queryKeys.user.all,
        });
      },
    },
  );

  const handleSubmit = (data) => {
    createUser.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button type="submit" disabled={createUser.isPending}>
        {createUser.isPending ? 'Creating...' : 'Create User'}
      </button>
    </form>
  );
}
```

## 🔧 Configuration

### Query Client Configuration

The QueryClient is configured in `src/components/providers/query-provider.tsx` with:

- **Stale Time**: 1 minute default
- **Retry Logic**: Smart retry (no retry on 4xx errors)
- **Background Refetch**: Enabled on window focus

### Query Keys Organization

Query keys are organized in `src/lib/api.ts` using a factory pattern:

```tsx
export const queryKeys = {
  user: {
    all: ['user'] as const,
    profile: () => [...queryKeys.user.all, 'profile'] as const,
  },
  // ... other entities
};
```

## 🛠 Common Patterns

### 1. Optimistic Updates

```tsx
const updateUser = useApiMutation(
  ({ id, ...data }) => api.patch(\`/users/\${id}\`, data),
  {
    onMutate: async (newData) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({
        queryKey: queryKeys.user.detail(newData.id),
      });

      // Snapshot previous value
      const previousUser = queryClient.getQueryData(
        queryKeys.user.detail(newData.id)
      );

      // Optimistically update
      queryClient.setQueryData(
        queryKeys.user.detail(newData.id),
        (old) => ({ ...old, ...newData })
      );

      return { previousUser };
    },
    onError: (err, newData, context) => {
      // Rollback on error
      queryClient.setQueryData(
        queryKeys.user.detail(newData.id),
        context.previousUser
      );
    },
    onSettled: (data, error, variables) => {
      // Always refetch after error or success
      queryClient.invalidateQueries({
        queryKey: queryKeys.user.detail(variables.id),
      });
    },
  }
);
```

### 2. Dependent Queries

```tsx
function UserPosts({ userId }: { userId: string }) {
  const userQuery = useUser(userId);

  const postsQuery = useApiQuery(
    ['posts', userId],
    () => api.get(\`/users/\${userId}/posts\`),
    {
      enabled: !!userQuery.data && userQuery.isSuccess,
    }
  );

  return <div>{/* render posts */}</div>;
}
```

### 3. Infinite Queries

```tsx
import { useInfiniteQuery } from '@tanstack/react-query';

function InfiniteProductList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['products', 'infinite'],
    queryFn: ({ pageParam = 0 }) =>
      api.get(\`/products?page=\${pageParam}\`),
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
  });

  return (
    <div>
      {data?.pages.map((page, i) => (
        <div key={i}>
          {page.data.map((product) => (
            <div key={product.id}>{product.name}</div>
          ))}
        </div>
      ))}

      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage
          ? 'Loading more...'
          : hasNextPage
          ? 'Load More'
          : 'Nothing more to load'}
      </button>
    </div>
  );
}
```

## 🎯 Best Practices

1. **Use Query Keys Factory**: Organize query keys using the factory pattern
2. **Set Appropriate Stale Time**: Configure based on data freshness requirements
3. **Handle Loading and Error States**: Always provide good UX for all states
4. **Use Optimistic Updates**: For better perceived performance
5. **Invalidate Strategically**: Only invalidate what needs to be refetched
6. **Enable/Disable Queries**: Use `enabled` option for conditional queries

## 🔍 DevTools

TanStack Query DevTools are included and will appear in development mode. Press the TanStack Query logo to open the DevTools panel.

## 📚 Resources

- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [Query Key Best Practices](https://tkdodo.eu/blog/effective-react-query-keys)
- [React Query Patterns](https://tkdodo.eu/blog/practical-react-query)

## 🌍 Environment Variables

Add your API base URL to `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://your-api-url.com/api
```
