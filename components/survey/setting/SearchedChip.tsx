import Close from 'public/icon/close.svg';
import { Common, Pretendard } from 'styles/common';
import styled from '@emotion/styled';
import RecentSearch from 'utills/RecentSearches';
interface Iprops {
  text: string;

  setState: (value: string[]) => void;
}

const SearchedChip = ({ text, setState }: Iprops) => {
  const deleteLocalHandler = () => {
    const research = RecentSearch.getInstance();
    research.deleteSearch(text);
    console.log(JSON.parse(research.getSearches() as string));
    setState(JSON.parse(research.getSearches() as string));
  };

  return (
    <SearchedChipStyle>
      #&nbsp;{text}
      <Close width="8" height="8" onClick={deleteLocalHandler} fill={Common.colors.GY500} />
    </SearchedChipStyle>
  );
};

export default SearchedChip;

const SearchedChipStyle = styled.li`
  display: flex;
  align-items: center;
  background-color: ${Common.colors.GY50};
  border: 1px solid ${Common.colors.GY200};
  height: 28px;
  width: auto;

  border-radius: 90px;
  padding: 4px 8px;
  ${Pretendard({ font: 1.3, weight: 400, color: Common.colors.GY900 })};
  line-height: 150%;
  text-align: center;

  & svg {
    margin-left: 5px;
  }
`;
