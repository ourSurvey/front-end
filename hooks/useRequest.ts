import { useQuery, QueryKey, UseQueryOptions, QueryFunction } from 'react-query';

export const useRequest = (request: QueryKey, func: QueryFunction, options?: UseQueryOptions) =>
  useQuery(request, func, options);
