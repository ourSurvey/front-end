import TokenProvider from "services/TokenProvider";
import { UseInfiniteQueryResult, useQuery, QueryKey, UseQueryOptions, useInfiniteQuery, UseInfiniteQueryOptions } from "react-query";
import { RequestDocument } from "graphql-request/dist/types";
import { GraphQLClient } from "graphql-request";

interface UseQueryFn<TData extends Record<string, any>, TVariables extends Record<string, any>> {
  (variables: TVariables, options?: UseQueryOptions<TData>): unknown;
  document: string;
  getKey: (variables: TVariables) => unknown[];
}

export const useGQLQuery = (key: QueryKey, query: RequestDocument, variables: any, config?: UseQueryOptions) => {
  //엔드포인트 설정
  const endpoint = `${process.env.NEXT_PUBLIC_API}/graphql`;

  //헤더 값 가져오기
  const headers = {
    headers: {
      Authorization: `Bearer ${TokenProvider.get("accessToken")}`,
    },
  };

  const graphQLClient = new GraphQLClient(endpoint, headers);
  const fetchData = async () => await graphQLClient.request(query, variables);
  // const fetchData = async () => await request(endpoint, query, variables);

  return useQuery(key, fetchData, config);
};

export const useInfiniteGQLQuery = (
  key: QueryKey,
  query: RequestDocument,
  getVariables: ({ pageParam }: { pageParam?: number }) => any,
  config?: UseInfiniteQueryOptions
) => {
  //엔드포인트 설정
  const endpoint = `${process.env.NEXT_PUBLIC_API}/graphql`;

  //헤더 값 가져오기
  const headers = {
    headers: {
      Authorization: `Bearer ${TokenProvider.get("accessToken")}`,
    },
  };

  const graphQLClient = new GraphQLClient(endpoint, headers);

  return useInfiniteQuery(
    key,
    ({ pageParam }) => {
      return graphQLClient.request(query, getVariables({ pageParam }));
    },
    config
  );
};

export function useInfiniteGraphQLQuery<TData extends Record<string, any>, TVariables extends Record<string, any>>(
  useQuery: UseQueryFn<TData, TVariables>,
  getVariables: ({ pageParam }: { pageParam?: number }) => TVariables,
  options?: UseInfiniteQueryOptions<TData, Error>
): UseInfiniteQueryResult<TData, Error> {
  const endpoint = `${process.env.NEXT_PUBLIC_API}/graphql`;

  //헤더 값 가져오기
  const headers = {
    headers: {
      Authorization: `Bearer ${TokenProvider.get("accessToken")}`,
    },
  };

  const graphQLClient = new GraphQLClient(endpoint, headers);

  return useInfiniteQuery<TData, Error>(
    useQuery.getKey(getVariables({})),
    ({ pageParam }) => {
      return graphQLClient.request(useQuery.document, getVariables({ pageParam }));
    },
    options
  );
}
