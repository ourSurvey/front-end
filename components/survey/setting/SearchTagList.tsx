import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';
import useDebounce from 'hooks/useDebouce';
import { tagState } from 'states/tag';
import { Pretendard, Common } from 'styles/common';
import { useResults } from 'utills/autoCompleteSecarch';

interface IProps {
  inputValue: string;
  onReset: () => void;
}

const SearchTagList = ({ inputValue, onReset }: IProps) => {
  const debouncedSearch = useDebounce(inputValue, 500);
  const { data } = useResults(debouncedSearch);
  const [tagList, setTagList] = useRecoilState(tagState);

  const addTagHandler = (tagName: string) => {
    setTagList([...tagList, tagName]);
    onReset();
  };

  return (
    <SearchTagListContainer>
      {data?.data.map((item: string) => {
        return (
          <li
            key={item}
            onClick={() => {
              addTagHandler(item);
            }}
          >
            #&nbsp;{item}
          </li>
        );
      })}
    </SearchTagListContainer>
  );
};

export default SearchTagList;

const SearchTagListContainer = styled.ul`
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
