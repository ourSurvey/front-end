import useDebounce from 'hooks/useDebouce';
import { useResults } from 'utills/autoCompleteSecarch';
import { Pretendard, Common } from 'styles/common';
import styled from '@emotion/styled';
import RecentSearch from 'utills/RecentSearches';
interface IProps {
  inputValue: string;
  onReset: () => void;
}

const RecentSearchList = ({ inputValue, onReset }: IProps) => {
  const debouncedSearch = useDebounce(inputValue, 500);
  const research = RecentSearch.getInstance();
  const { data } = useResults(debouncedSearch);

  const addSearchKeyHandler = (serachKey: string) => {
    research.setSearches(serachKey);
    onReset();
  };

  return (
    <RecentSearchListContainer>
      {data?.data.map((item: string) => {
        return (
          <li key={item} onClick={() => addSearchKeyHandler(item)}>
            #&nbsp;{item}
          </li>
        );
      })}
    </RecentSearchListContainer>
  );
};

export default RecentSearchList;

const RecentSearchListContainer = styled.ul`
  margin: 0;
  padding-left: 0;
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  gap: 24px 0;

  & li {
    ${Pretendard({ font: 1.4, weight: 400, color: Common.colors.GY900 })};
    line-height: 150%;
  }
`;
