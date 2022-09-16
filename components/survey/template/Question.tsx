import { useState, memo, useEffect } from "react";
import styled from "@emotion/styled";
import More from "public/icon/vertical-three-dots.svg";
import { Common, Pretendard, SpaceBetween } from "styles/common";
import Toggle from "components/common/Toggle";
import QusetionTitle from "./QusetionTitle";
import SelectOptionContainer from "./SelectOptionContainer";

import { qusetionListAtomFamily, MoreModalAtom } from "states/survey";
import { useRecoilState, useSetRecoilState } from "recoil";
import { QuestionIDFormat } from "utills/getDateSixth";
interface IProps {
  questionId: number;
  color: string;
  partNumber: number;
  setVisibleMore: (bool: boolean) => void;
}

const Question = ({ color, questionId, partNumber, setVisibleMore }: IProps) => {
  const [question, setQusetion] = useRecoilState(qusetionListAtomFamily(QuestionIDFormat(questionId + 1, partNumber)));
  const setQusetionId = useSetRecoilState(MoreModalAtom);
  const Title = styled.div`
    & .part {
      ${Pretendard({ font: 1, weight: 700, color: color === "pink" ? Common.colors.PK500 : Common.colors.GR500 })};
      line-height: 150%;
      background-color: ${color === "pink" ? Common.colors.PK50 : Common.colors.GR50};
      border-radius: 4px;
      padding: 1px 4px;
      margin-right: 4px;
    }

    & .question-num {
      ${Pretendard({ font: 1, weight: 700, color: Common.colors.GY700 })};
      line-height: 150%;
    }
  `;

  const setMoreModal = () => {
    setQusetionId(QuestionIDFormat(questionId + 1, partNumber));
    setVisibleMore(true);
  };

  return (
    <Container className="question">
      <Header>
        <Title>
          <span className="part">PT{partNumber}</span>
          <span className="question-num">질문 {questionId + 1}.</span>
        </Title>
        <div className="right">
          <Toggle color={color} name="필수" question={question} setQuestion={setQusetion} id={QuestionIDFormat(questionId + 1, partNumber)} />
          <More onClick={setMoreModal} />
        </div>
      </Header>

      <TitleContainer>
        <QusetionTitle placeHolder="질문" value={question} setValue={setQusetion} hasImageInput={true} />
      </TitleContainer>
      <SelectOptionContainer partIndex={partNumber} questionIndex={questionId + 1} color={color} />
    </Container>
  );
};

export default memo(Question);

const Container = styled.div`
  background-color: #fff;
  padding: 37px 20px 0 20px;
`;

const Header = styled.div`
  ${SpaceBetween()}

  & .right {
    display: flex;
  }
  & svg {
    margin-left: 14px;
  }
`;

const TitleContainer = styled.div``;
