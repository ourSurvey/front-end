import TokenProvider from "services/TokenProvider";
import { useQuery, QueryKey, UseQueryOptions } from "react-query";
import { RequestDocument } from "graphql-request/dist/types";
import { GraphQLClient } from "graphql-request";

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
