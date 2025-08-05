import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Base API function type
type ApiFn<TData = unknown, TVariables = void> = (
  variables: TVariables,
) => Promise<TData>;

// Custom hook for queries with better TypeScript support
export function useApiQuery<TData = unknown, TError = Error>(
  queryKey: readonly unknown[],
  queryFn: () => Promise<TData>,
  options?: {
    enabled?: boolean;
    staleTime?: number;
    cacheTime?: number;
    refetchOnWindowFocus?: boolean;
    retry?: boolean | number;
  },
) {
  return useQuery<TData, TError>({
    queryKey,
    queryFn,
    ...options,
  });
}

// Custom hook for mutations with better TypeScript support
export function useApiMutation<
  TData = unknown,
  TError = Error,
  TVariables = void,
>(
  mutationFn: ApiFn<TData, TVariables>,
  options?: {
    onSuccess?: (data: TData, variables: TVariables) => void;
    onError?: (error: TError, variables: TVariables) => void;
    onSettled?: (
      data: TData | undefined,
      error: TError | null,
      variables: TVariables,
    ) => void;
  },
) {
  const queryClient = useQueryClient();

  return useMutation<TData, TError, TVariables>({
    mutationFn,
    onSuccess: (data, variables) => {
      options?.onSuccess?.(data, variables);
    },
    onError: (error, variables) => {
      options?.onError?.(error, variables);
    },
    onSettled: (data, error, variables) => {
      options?.onSettled?.(data, error, variables);
    },
  });
}

// Hook to get query client for manual cache management
export function useQueryClientInstance() {
  return useQueryClient();
}
