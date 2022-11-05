import Prev from 'public/icon/prevArrow.svg';
import { Common, Pretendard, SpaceBetween } from 'styles/common';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import SearchSvg from 'public/icon/search.svg';
import { useRef, useState } from 'react';
import RecentSearch from 'utills/RecentSearches';
import RecentSearchList from 'components/survey/template/RecentSearchList';
import ShowSearchList from 'components/survey/template/ShowSearchList';

interface IStyle {
  inputFocus?: boolean;
  searchText: string;
}

const Search = () => {
  const router = useRouter();
  const research = RecentSearch.getInstance();
  const [searchText, setSearchText] = useState('');
  const [inputFocus, setinputFocus] = useState(false);
  const refs = useRef<HTMLInputElement>(null);
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const onReset = () => {
    setSearchText('');
    refs.current && refs.current.focus();
  };

  const addTagHandler = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      research.setSearches(searchText);
      onReset();
    }
  };

  return (
    <Container searchText={searchText}>
      <Header>
        <SvgPosition>
          <Prev width="20" height="16" onClick={() => router.back()} />
        </SvgPosition>
        <PageTitle>검색</PageTitle>
        <Save></Save>
      </Header>

      <InputContainer inputFocus={inputFocus} searchText={searchText}>
        <input
          onKeyUp={addTagHandler}
          ref={refs}
          id="searchText-input"
          type="text"
          placeholder="검색어를 입력해주세요"
          onChange={(e) => onChangeHandler(e)}
          onBlur={() => setinputFocus(false)}
          onFocus={() => setinputFocus(true)}
          value={searchText}
        />
        <SearchSvg />
      </InputContainer>

      {searchText !== '' ? (
        <RecentSearchList inputValue={searchText} onReset={onReset} />
      ) : (
        <>
          <CountContainer>
            <span className="maximun">최근 검색</span>
          </CountContainer>
          <ShowSearchList />
        </>
      )}
    </Container>
  );
};

export default Search;

const Container = styled.main<IStyle>`
  height: 100%;
  & input {
    padding: 14.5px 15px 14.5px 24px;
    border: 1px solid ${Common.colors.GY300};
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    border-top-right-radius: ${(props) => (props.searchText !== '' ? 0 : 10)}px;
    border-bottom-right-radius: ${(props) => (props.searchText !== '' ? 0 : 10)}px;
    height: 46px;
    width: 100%;
    ${Pretendard({ font: 1.4, weight: 400, color: Common.colors.GY900 })}
    line-height: 150%;
  }
  & input::placeholder {
    ${Pretendard({ font: 1.4, weight: 400, color: Common.colors.GY500 })}
    line-height: 150%;
  }
`;

const Header = styled.header`
  ${SpaceBetween()};
  align-items: center;
  padding: 0 20px 20px 14px;
  border-bottom: 1px solid ${Common.colors.GY100};
  width: calc(100% + 40px);
  margin: 0 -20px 24px -20px;
`;

const PageTitle = styled.span`
  ${Pretendard({ font: 1.4, weight: 700, color: Common.colors.GY900 })};
  line-height: 150%;
`;
const Save = styled.span`
  ${Pretendard({ font: 1, weight: 400, color: Common.colors.GY900 })};
  line-height: 150%;
`;

const SvgPosition = styled.div`
  position: relative;
  top: 25%;
  -webkit-transform: translateY(25%);
  -ms-transform: translateY(25%);
  transform: translateY(25%);
`;

const CountContainer = styled.div`
  margin-bottom: 24px;
  & .current {
    ${Pretendard({ font: 1.2, weight: 700, color: Common.colors.GY900 })}
  }
  & .maximun {
    ${Pretendard({ font: 1.2, weight: 700, color: Common.colors.GY900 })}
  }
`;

const InputContainer = styled.div<IStyle>`
  position: relative;
  width: 100%;
  display: flex;
  margin-bottom: 14px;

  & input {
    border: 1px solid ${Common.colors.GY300};
    border-radius: 10px;
  }

  & svg {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
  }
  & button {
    display: ${(props) => (props.searchText !== '' ? 'block' : 'none')};
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;

    border: 1px solid ${Common.colors.GY700};

    background-color: ${Common.colors.GY50};
    width: 50px;
    ${Pretendard({ font: 1.4, weight: 700, color: Common.colors.BL500 })};
    line-height: 150%;
  }
`;
