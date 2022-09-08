import styled from "@emotion/styled";
import { Common, Pretendard } from "styles/common";
import QusetionTitle from "./QusetionTitle";
import InvertedTriangle from "public/icon/inverted-triangle.svg";
import Question from "./Question";
import Copy from "public/icon/copy.svg";
import Plus from "public/icon/plus-two.svg";
import { IQuestion, ISection, ISurveyData } from "types/survey";
import { useState } from "react";
import { surveyState } from "states/survey";
import { useRecoilState } from "recoil";

const INITIAL_QUESTIONS: IQuestion = { ask: "", explain: "", multiFl: 1, essFl: 0, dupFl: 0, oder: 0, questionItems: [] };
const INITIAL_PART: ISection = {
  title: "", //섹션제목,
  content: "", //설명,
  nextSection: -1, //*다음섹션(Integer|-1이면 이 섹션이 마지막 섹션, 사실 그냥 index값임 프론트에서도 설문 만들 때 정렬해서 보여줘야하니깐 index값 그대로 넣기),
  questions: [
    {
      ask: "",
      explain: "",
      multiFl: 1,
      essFl: 0,
      dupFl: 0,
      oder: 0,
      questionItems: [],
    },
  ],
};

interface IProps {
  PartNum: number;
}

const Part = ({ PartNum }: IProps) => {
  const [surveyData, setSurveyData] = useRecoilState(surveyState);
  const [part, setPart] = useState<ISection>({
    title: "", //섹션제목,
    content: "", //설명,
    nextSection: -1, //*다음섹션(Integer|-1이면 이 섹션이 마지막 섹션, 사실 그냥 index값임 프론트에서도 설문 만들 때 정렬해서 보여줘야하니깐 index값 그대로 넣기),
    questions: [
      {
        ask: "",
        explain: "",
        multiFl: 1,
        essFl: 0,
        dupFl: 0,
        oder: 0,
        questionItems: [],
      },
    ],
  });

  const createPartHandler = () => {
    setSurveyData({ ...surveyData, sections: [...surveyData.sections, INITIAL_PART] });
  };

  const createQustionHandler = () => {
    setPart((prev) => {
      return { ...prev, questions: [...prev.questions, INITIAL_QUESTIONS] };
    });
  };

  const PartTitle = styled.div`
    & h1 {
      display: inline;
      ${Pretendard({ font: 1.6, weight: 700, color: (PartNum + 1) % 2 === 0 ? Common.colors.PK500 : Common.colors.GR500 })};
      line-height: 150%;
      letter-spacing: -0.03em;
    }
    & .total-step {
      ${Pretendard({ font: 1.2, weight: 400, color: Common.colors.GY300 })};
      line-height: 150%;
    }
  `;

  return (
    <PartContainer>
      <header>
        <SubjectContainer>
          <PartTitle>
            <h1>PART {PartNum + 1}</h1>
            <span className="total-step">/{surveyData.sections.length}</span>
          </PartTitle>
          <QusetionCount>
            <span>총 {surveyData.sections[PartNum].questions.length}개 질문</span>
            <InvertedTriangle />
          </QusetionCount>
        </SubjectContainer>
      </header>
      <div className="qustion-title">
        <QusetionTitle setValue={setPart} value={part} placeHolder="파트" hasImageInput={false} />
      </div>
      <Line></Line>
      <QusetionContainer>
        {part.questions.map((question) => {
          return <Question color={(PartNum + 1) % 2 === 0 ? "pink" : "green"} setPart={setPart} key={question.oder} />;
        })}
      </QusetionContainer>

      <PartButtonContainer>
        <button onClick={createPartHandler}>
          <Copy stroke="#fff" />
          파트추가
        </button>
        <button onClick={() => setPart({ ...part, questions: [...part.questions, INITIAL_QUESTIONS] })}>
          <Plus />
          질문 추가
        </button>
      </PartButtonContainer>
    </PartContainer>
  );
};

export default Part;

const PartContainer = styled.section`
  width: 100%;
  /* padding: 0 20px; */
  padding-top: 30px;
  background-color: #fff;

  margin-bottom: 10px;

  & header,
  .qustion-title {
    padding: 0 20px;
  }
`;

const Line = styled.div`
  width: 100%;
  height: 10px;
  background-color: ${Common.colors.GY50};
`;

const SubjectContainer = styled.div`
  display: flex;
  justify-content: space-between;
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

const QusetionContainer = styled.div`
  background-color: ${Common.colors.GY50};

  & .question:not(:last-child) {
    margin-bottom: 10px;
  }
`;

const PartButtonContainer = styled.div`
  bottom: 0;
  position: relative;
  display: flex;
  width: calc(100% + 20 * 2);

  margin: 0 -20px 0 -20px;
  background-color: ${Common.colors.GY500};

  & button {
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 50px;
    border: none;
    background-color: ${Common.colors.GY500};
    ${Pretendard({ font: 1.2, weight: 700, color: "#fff" })};
    line-height: 150%;
    letter-spacing: -0.03em;

    & svg {
      margin-right: 6px;
    }

    &:first-of-type {
      &::after {
        position: absolute;
        content: "";
        width: 1px;
        height: 20px;
        background-color: #fff;
        right: 50%;
      }
    }
  }
`;
