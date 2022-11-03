import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import RecentSearch from 'utills/RecentSearches';
import SearchedChip from '../setting/SearchedChip';
const ShowSearchList = () => {
  const research = RecentSearch.getInstance();
  const [listState, setlistState] = useState(() => JSON.parse(research.getSearches() as string) || []);

  useEffect(() => {}, [listState]);
  return (
    <TagListContainer>
      {listState.map((item: string) => (
        <SearchedChip setState={setlistState} key={item} text={item} />
      ))}
    </TagListContainer>
  );
};

export default ShowSearchList;

const TagListContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 14px 12px;
  max-height: calc(100% - 151px);
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  margin: 0;
  padding-left: 0;
`;
