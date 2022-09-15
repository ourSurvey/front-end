import { useState, memo, useEffect } from "react";
import styled from "@emotion/styled";
import More from "public/icon/vertical-three-dots.svg";
import { Common, Pretendard, SpaceBetween } from "styles/common";
import Toggle from "components/common/Toggle";
import QusetionTitle from "./QusetionTitle";
import SelectOptionContainer from "./SelectOptionContainer";
import Portal from "components/common/Portal";
import MoreSideModal from "../MoreSideModal";
import { qusetionListAtomFamily } from "states/survey";
import { useRecoilState } from "recoil";
import { QuestionIDFormat } from "utills/getDateSixth";
interface IProps {
  questionId: number;
  color: string;
  partNumber: number;
}

const Question = ({ color, questionId, partNumber }: IProps) => {
  const [visibleMore, setVisibleMore] = useState(false);
  const [question, setQusetion] = useRecoilState(qusetionListAtomFamily(QuestionIDFormat(questionId + 1, partNumber)));

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

  return (
    <Container className="question">
      <Header>
        <Title>
          <span className="part">PT{partNumber}</span>
          <span className="question-num">질문 {questionId + 1}.</span>
        </Title>
        <div className="right">
          <Toggle color={color} name="필수" question={question} setQuestion={setQusetion} id={QuestionIDFormat(questionId + 1, partNumber)} />
          <More onClick={() => setVisibleMore(true)} />
        </div>
      </Header>

      <TitleContainer>
        <QusetionTitle placeHolder="질문" value={question} setValue={setQusetion} hasImageInput={true} />
      </TitleContainer>
      <SelectOptionContainer partIndex={partNumber} questionIndex={questionId} color={color} />
      <Portal selector="#portal">{visibleMore ? <MoreSideModal visibleState={visibleMore} setVisible={setVisibleMore} /> : null}</Portal>
    </Container>
  );
};

export default Question;

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
