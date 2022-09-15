import useDebounce from "hooks/useDebouce";
import React from "react";
import { useResults } from "utills/autoCompleteSecarch";
import { Pretendard, Common } from "styles/common";
import styled from "@emotion/styled";
interface IProps {
  inputValue: string;
}

const SearchTagList = ({ inputValue }: IProps) => {
  const debouncedSearch = useDebounce(inputValue, 500);
  const { data } = useResults(debouncedSearch);

  return (
    <SearchTagListContainer>
      {data?.data.map((item: string) => {
        return <li key={item}># {item}</li>;
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
