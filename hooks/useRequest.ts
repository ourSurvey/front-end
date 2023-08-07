import { useQuery, type QueryKey, type UseQueryOptions, type QueryFunction } from 'react-query';

export const useRequest = (request: QueryKey, func: QueryFunction, options?: UseQueryOptions) =>
  useQuery(request, func, options);
