import React from "react";
import styled from "@emotion/styled";
import { Common, Pretendard } from "styles/common";
import QusetionTitle from "./QusetionTitle";
import CreateSurveyHeader from "../CreateSurveyHeader";
import InvertedTriangle from "public/icon/inverted-triangle.svg";
import Question from "./Question";
const Part = () => {
  return (
    <PartContainer>
      <header>
        <CreateSurveyHeader hasUnderLine={false} name="질문을 작성해주세요." step="02" />
        <SubjectContainer>
          <PartTitle>
            <h1>PART 1</h1>
            <span className="total-step">/3</span>
          </PartTitle>
          <QusetionCount>
            <span>총 NN개 질문</span>
            <InvertedTriangle />
          </QusetionCount>
        </SubjectContainer>
        <QusetionTitle hasImageInput={false} />
      </header>

      <Line></Line>

      <Question />
    </PartContainer>
  );
};

export default Part;

const PartContainer = styled.section`
  height: 100%;
`;

const SubjectContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Line = styled.div`
  width: calc(100% + 20 * 2);

  margin: 0 -20px 0 -20px;
  height: 10px;
  background-color: ${Common.colors.GY50};
`;

const PartTitle = styled.div`
  & h1 {
    display: inline;
    ${Pretendard({ font: 1.6, weight: 700, color: Common.colors.GR500 })};
    line-height: 150%;
    letter-spacing: -0.03em;
  }
  & .total-step {
    ${Pretendard({ font: 1.2, weight: 400, color: Common.colors.GY300 })};
    line-height: 150%;
    vertical-align: middle;
  }
`;

const QusetionCount = styled.div`
  & span {
    ${Pretendard({ font: 1, weight: 700, color: Common.colors.GY700 })};
    line-height: 150%;
    letter-spacing: -0.03em;
  }
  & svg {
    margin-left: 6px;
  }
`;
