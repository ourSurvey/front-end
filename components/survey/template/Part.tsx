import styled from "@emotion/styled";
import { Common, Pretendard } from "styles/common";
import QusetionTitle from "./QusetionTitle";
import InvertedTriangle from "public/icon/inverted-triangle.svg";
import Question from "./Question";
import { memo } from "react";
import Copy from "public/icon/copy.svg";
import Plus from "public/icon/plus-two.svg";
import { sectionListAtomFamily, sectionIdListAtom, qusetionIdListAtom } from "states/survey";
import { useRecoilCallback, useRecoilState, useRecoilValue } from "recoil";
import { QuestionListID } from "types/survey";
import { PartIDFormat, QuestionListIDFormat } from "utills/getDateSixth";

interface IProps {
  PartNum: number;
  ListLength: number;
}

const Part = ({ PartNum, ListLength }: IProps) => {
  const SyscodeFormat: QuestionListID = QuestionListIDFormat(PartNum + 1);
  const [partData, setPartData] = useRecoilState(sectionListAtomFamily(PartIDFormat(PartNum + 1)));
  const questionIdList = useRecoilValue(qusetionIdListAtom(SyscodeFormat)); //질문들의 IDList

  const addPart = useRecoilCallback(({ snapshot, set }) => () => {
    const partIds = snapshot.getLoadable(sectionIdListAtom).getValue();
    //Syscode에서 마지막 숫자 가져오기
    const lastNumber = partIds[partIds.length - 1].slice(-1);
    set(sectionIdListAtom, [...partIds, PartIDFormat(Number(lastNumber) + 1)]);
  });

  const addQuestion = useRecoilCallback(({ snapshot, set }) => () => {
    const questionIds = snapshot.getLoadable(qusetionIdListAtom(PartNum)).getValue();
    set(qusetionIdListAtom(PartNum), [...questionIds, questionIds.length]);
  });

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
            <span className="total-step">/{ListLength}</span>
          </PartTitle>
          <QusetionCount>
            <span>총 {questionIdList.length}개 질문</span>
            <InvertedTriangle />
          </QusetionCount>
        </SubjectContainer>
      </header>
      <div className="qustion-title">
        <QusetionTitle setValue={setPartData} value={partData} placeHolder="파트" hasImageInput={false} />
      </div>
      <Line></Line>
      <QusetionContainer>
        {questionIdList.map((id) => {
          return <Question partNumber={PartNum + 1} questionId={id} color={(PartNum + 1) % 2 === 0 ? "pink" : "green"} key={id} />;
        })}
      </QusetionContainer>

      <PartButtonContainer>
        <button onClick={addPart}>
          <Copy stroke="#fff" />
          파트추가
        </button>
        <button onClick={addQuestion}>
          <Plus />
          질문 추가
        </button>
      </PartButtonContainer>
    </PartContainer>
  );
};

export default memo(Part);

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
