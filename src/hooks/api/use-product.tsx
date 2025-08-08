import { queryKeys } from '@/lib/api';

import { listProducts } from '@/api';

import { useApiQuery } from '../use-api';

// TODO: Implement filtering & Searching from BE Side
export function useProductListQuery() {
  return useApiQuery(queryKeys.product.all, () => listProducts(), {
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: true,
  });
}
