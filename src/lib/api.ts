import axiosClient from './axios-client';

// Query key factory - helps organize and manage cache keys
export const queryKeys = {
  // User related queries
  user: {
    all: ['user'] as const,
    profile: () => [...queryKeys.user.all, 'profile'] as const,
    settings: () => [...queryKeys.user.all, 'settings'] as const,
  },

  // Product related queries
  product: {
    all: ['product'] as const,
    detail: (id: string | number) =>
      [...queryKeys.product.all, 'detail', id] as const,
  },

  // Collaboration related queries
  collaborations: {
    all: ['collaborations'] as const,
    list: (filters?: Record<string, unknown>) =>
      [...queryKeys.collaborations.all, 'list', filters] as const,
    detail: (id: string | number) =>
      [...queryKeys.collaborations.all, 'detail', id] as const,
    active: () => [...queryKeys.collaborations.all, 'active'] as const,
  },

  // Marketplace related queries
  marketplace: {
    all: ['marketplace'] as const,
    products: (filters?: Record<string, unknown>) =>
      [...queryKeys.marketplace.all, 'products', filters] as const,
    product: (id: string | number) =>
      [...queryKeys.marketplace.all, 'product', id] as const,
    categories: () => [...queryKeys.marketplace.all, 'categories'] as const,
  },

  // Partners related queries
  partners: {
    all: ['partners'] as const,
    recommendations: () =>
      [...queryKeys.partners.all, 'recommendations'] as const,
    list: (filters?: Record<string, unknown>) =>
      [...queryKeys.partners.all, 'list', filters] as const,
  },
} as const;

// Common API response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: 'success' | 'error';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// API functions using axios client
export const api = {
  // GET request
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get: async <T>(endpoint: string, config?: any) => {
    const response = await axiosClient.get<T>(endpoint, config);
    return response.data;
  },

  // POST request
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post: async <T>(endpoint: string, data?: unknown, config?: any) => {
    const response = await axiosClient.post<T>(endpoint, data, config);
    return response.data;
  },

  // PUT request
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  put: async <T>(endpoint: string, data?: unknown, config?: any) => {
    const response = await axiosClient.put<T>(endpoint, data, config);
    return response.data;
  },

  // PATCH request
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  patch: async <T>(endpoint: string, data?: unknown, config?: any) => {
    const response = await axiosClient.patch<T>(endpoint, data, config);
    return response.data;
  },

  // DELETE request
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete: async <T>(endpoint: string, config?: any) => {
    const response = await axiosClient.delete<T>(endpoint, config);
    return response.data;
  },
};
