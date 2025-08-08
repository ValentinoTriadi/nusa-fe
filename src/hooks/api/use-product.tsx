import { queryKeys } from '@/lib/api';

import { getProduct, listProducts } from '@/api';

import { useApiQuery } from '../use-api';

// TODO: Implement filtering & Searching from BE Side
export function useProductListQuery() {
  return useApiQuery(
    queryKeys.product.all,
    () => listProducts({ withCredentials: true }),
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      enabled: true,
    },
  );
}

export function useProductDetailQuery(id: string) {
  return useApiQuery(
    queryKeys.product.detail(id),
    () =>
      getProduct({
        path: { id },
        withCredentials: true,
      }),
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      enabled: !!id,
    },
  );
}
