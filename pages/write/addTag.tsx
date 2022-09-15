import { NextPage } from "next";
import Prev from "public/icon/prevArrow.svg";
import { Common, Pretendard, SpaceBetween } from "styles/common";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import CloseCircle from "public/icon/close-circle.svg";
import { useRef, useState } from "react";
import SearchTagList from "components/survey/setting/SearchTagList";
import ShowTagList from "components/survey/setting/ShowTagList";
import { tagState } from "states/tag";
import { useRecoilState } from "recoil";
interface IStyle {
  inputFocus?: boolean;
  tag: string;
}

const AddTag: NextPage = () => {
  const router = useRouter();
  const [tag, setTag] = useState("");
  const [inputFocus, setinputFocus] = useState(false);
  const refs = useRef<HTMLInputElement>(null);
  const [tagList, setTagList] = useRecoilState(tagState);
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTag(e.target.value);
  };

  const onReset = () => {
    setTag("");
    refs.current && refs.current.focus();
  };

  const addTagHandler = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setTagList([...tagList, tag]);
      onReset();
    }
  };
  const addTagClick = () => {
    setTagList([...tagList, tag]);
    onReset();
  };

  return (
    <Container tag={tag}>
      <Header>
        <SvgPosition onClick={() => router.back()}>
          <Prev width="20" height="16" />
        </SvgPosition>
        <PageTitle>태그 추가</PageTitle>
        <Save>저장</Save>
      </Header>

      <InputContainer inputFocus={inputFocus} tag={tag}>
        <span className="shapp" />
        <input
          onKeyUp={addTagHandler}
          ref={refs}
          id="tag-input"
          type="text"
          placeholder="태그를 입력해주세요."
          onChange={(e) => onChangeHandler(e)}
          onBlur={() => setinputFocus(false)}
          onFocus={() => setinputFocus(true)}
          value={tag}
        />
        <button onClick={addTagClick}>추가</button>
        <CloseCircle onClick={onReset} />
      </InputContainer>

      <CountContainer>
        <span className="current">{tagList.length}&nbsp;</span>
        <span className="maximun">| 최대 30개</span>
      </CountContainer>
      {tag !== "" ? <SearchTagList inputValue={tag} onReset={onReset} /> : <ShowTagList />}
    </Container>
  );
};

export default AddTag;

const Container = styled.main<IStyle>`
  margin-bottom: 30px;
  & input {
    padding: 14.5px 15px 14.5px 24px;
    border: 1px solid ${Common.colors.GY300};
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    border-top-right-radius: ${(props) => (props.tag !== "" ? 0 : 10)}px;
    border-bottom-right-radius: ${(props) => (props.tag !== "" ? 0 : 10)}px;
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
  margin-top: 14px;
  margin-bottom: 24px;
  & .current {
    ${Pretendard({ font: 1.2, weight: 700, color: Common.colors.GY900 })}
  }
  & .maximun {
    ${Pretendard({ font: 1.2, weight: 400, color: Common.colors.GY500 })}
  }
`;

const InputContainer = styled.div<IStyle>`
  position: relative;
  width: 100%;
  display: flex;

  & input {
    border-top-right-radius: ${(props) => (props.tag !== "" ? 0 : 10)}px;
    border-bottom-right-radius: ${(props) => (props.tag !== "" ? 0 : 10)}px;
  }
  & .shapp {
    position: absolute;
    top: 11px;
    left: 16px;

    &::before {
      content: "#";
      ${Pretendard({ font: 1.4, weight: 400, color: Common.colors.GY500 })};
      line-height: 150%;
    }
  }

  & svg {
    display: ${(props) => (props.tag !== "" ? "block" : "none")};
    position: absolute;
    right: 64px;
    top: 13px;
  }
  & button {
    display: ${(props) => (props.tag !== "" ? "block" : "none")};
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;

    border: 1px solid ${Common.colors.GY700};

    background-color: ${Common.colors.GY50};
    width: 50px;
    ${Pretendard({ font: 1.4, weight: 700, color: Common.colors.BL500 })};
    line-height: 150%;
  }
`;
