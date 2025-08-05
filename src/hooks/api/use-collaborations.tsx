import {
  type ApiResponse,
  type PaginatedResponse,
  api,
  queryKeys,
} from '@/lib/api';

import {
  useApiMutation,
  useApiQuery,
  useQueryClientInstance,
} from '@/hooks/use-api';

// Types for collaboration
export interface Collaboration {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'pending' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  partnerId: string;
  partnerName: string;
  category: string;
}

export interface CreateCollaborationData {
  title: string;
  description: string;
  partnerId: string;
  category: string;
}

export interface CollaborationFilters extends Record<string, unknown> {
  status?: string;
  category?: string;
  partnerId?: string;
  page?: number;
  limit?: number;
}

// Hooks for collaboration-related API calls
export function useCollaborations(filters?: CollaborationFilters) {
  return useApiQuery(
    queryKeys.collaborations.list(filters),
    () =>
      api.get<PaginatedResponse<Collaboration>>('/collaborations', {
        params: filters,
      }),
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      enabled: true,
    },
  );
}

export function useCollaboration(id: string) {
  return useApiQuery(
    queryKeys.collaborations.detail(id),
    () => api.get<ApiResponse<Collaboration>>(`/collaborations/${id}`),
    {
      enabled: !!id,
      staleTime: 10 * 60 * 1000, // 10 minutes
    },
  );
}

export function useActiveCollaborations() {
  return useApiQuery(
    queryKeys.collaborations.active(),
    () => api.get<ApiResponse<Collaboration[]>>('/collaborations/active'),
    {
      staleTime: 2 * 60 * 1000, // 2 minutes
    },
  );
}

export function useCreateCollaboration() {
  const queryClient = useQueryClientInstance();

  return useApiMutation(
    (data: CreateCollaborationData) =>
      api.post<ApiResponse<Collaboration>>('/collaborations', data),
    {
      onSuccess: () => {
        // Invalidate and refetch collaborations list
        queryClient.invalidateQueries({
          queryKey: queryKeys.collaborations.all,
        });
      },
      onError: (error) => {
        console.log('Failed to create collaboration:', error);
      },
    },
  );
}

export function useUpdateCollaboration() {
  const queryClient = useQueryClientInstance();

  return useApiMutation(
    ({ id, ...data }: { id: string } & Partial<CreateCollaborationData>) =>
      api.patch<ApiResponse<Collaboration>>(`/collaborations/${id}`, data),
    {
      onSuccess: (data, variables) => {
        // Update the specific collaboration in cache
        queryClient.setQueryData(
          queryKeys.collaborations.detail(variables.id),
          data,
        );

        // Invalidate collaborations list
        queryClient.invalidateQueries({
          queryKey: queryKeys.collaborations.all,
        });
      },
    },
  );
}

export function useDeleteCollaboration() {
  const queryClient = useQueryClientInstance();

  return useApiMutation(
    (id: string) => api.delete<ApiResponse<void>>(`/collaborations/${id}`),
    {
      onSuccess: (_, deletedId) => {
        // Remove from cache
        queryClient.removeQueries({
          queryKey: queryKeys.collaborations.detail(deletedId),
        });

        // Invalidate collaborations list
        queryClient.invalidateQueries({
          queryKey: queryKeys.collaborations.all,
        });
      },
    },
  );
}
