import { useQuery } from 'react-query';
import { getTagList } from 'services/api/survey';

export const useResults = (keyword: string) => {
  return useQuery(['tagKeyword', keyword], async () => await getTagList(keyword), {
    enabled: !!keyword,
    refetchOnWindowFocus: false,
    staleTime: 5 * 1000 * 60,
  });
};
