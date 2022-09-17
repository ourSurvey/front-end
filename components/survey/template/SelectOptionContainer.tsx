import { useState } from "react";
import styled from "@emotion/styled";
import { Common, Pretendard } from "styles/common";
import MultipleSelection from "./MultipleSelection";
import Plus from "public/icon/plus.svg";
import { useRecoilCallback, useRecoilState } from "recoil";
import { qusetionItemIdListAtom, qusetionListAtomFamily } from "states/survey";
import { QuestionID, QuestionItemListID } from "types/survey";
import { getDateSixDigitsFormatToday, numberSet } from "utills/getDateSixth";
interface IProps {
  color: string;
  questionIndex: number;
  partIndex: number;
  hasNextSectionFlag: boolean;
  questionAtomFamilyID: QuestionID;
}

const SelectOptionContainer = ({ color, questionIndex, partIndex, hasNextSectionFlag, questionAtomFamilyID }: IProps) => {
  const PartFormat = `SCTN${getDateSixDigitsFormatToday()}${numberSet(partIndex)}`;
  const QuestionFormat = `QSTN${getDateSixDigitsFormatToday()}${numberSet(questionIndex)}`;
  const [question, setQuestion] = useRecoilState(qusetionListAtomFamily(questionAtomFamilyID));

  const SyscodeFormat = `${PartFormat}${QuestionFormat}` as QuestionItemListID;
  const [isActive, setIsActive] = useState<0 | 1>(1);

  const addQuestionItem = useRecoilCallback(({ snapshot, set }) => () => {
    const questionItemIds = snapshot.getLoadable(qusetionItemIdListAtom(SyscodeFormat)).getValue();
    const lastNumber = questionItemIds[questionItemIds.length - 1].slice(-1);
    set(qusetionItemIdListAtom(SyscodeFormat), [...questionItemIds, `${SyscodeFormat}${Number(lastNumber) + 1}`] as QuestionItemListID[]);
  });

  //중복 가능여부 설정
  const onDuplicatePossible = () => {
    const flag = question.dupFl === 1 ? 0 : 1;
    setQuestion({
      ...question,
      dupFl: flag,
    });
  };

  //객관식 주관식 설정
  const onMultipleFlag = () => {
    const flag = question.multiFl === 1 ? 0 : 1;
    setQuestion({
      ...question,
      multiFl: flag,
    });
  };

  const SelectOption = styled.ul`
    display: flex;
    list-style-type: none;
    position: relative;
    padding-left: 0;
    margin: 0;
    margin-top: 8px;
    margin-bottom: 18px;
    & li:not(:last-child) {
      margin-right: 5px;
    }

    & li {
      padding: 4px 8px;
      height: 26px;
      border-radius: 90px;
      ${Pretendard({ font: 1.2, weight: 400, color: Common.colors.GY700 })};
      border: 1px solid ${Common.colors.GY100};
      line-height: 150%;
      text-align: center;

      transition: 0.5s;
    }

    & .active {
      background-color: ${color === "pink" ? Common.colors.PK500 : Common.colors.GR500};
      ${Pretendard({ font: 1.2, weight: 700, color: "#fff" })};

      line-height: 150%;
    }
  `;

  return (
    <Container>
      <SelectionTitle>선택지 입력</SelectionTitle>
      <SelectOption>
        <li onClick={onMultipleFlag} className={question.multiFl === 1 ? "active" : ""}>
          객관식
        </li>
        <li onClick={onMultipleFlag} className={question.multiFl === 0 ? "active" : ""}>
          주관식
        </li>
        <li className={question.dupFl === 1 ? "active" : ""} onClick={onDuplicatePossible}>
          중복 선택 가능
        </li>
      </SelectOption>

      {isActive ? (
        <MultipleSelection hasNextSectionFlag={hasNextSectionFlag} sysCode={SyscodeFormat} partIndex={partIndex} questionIndex={questionIndex} />
      ) : (
        <Input disabled placeholder="이곳에 답변을 입력해주세요." />
      )}
      {isActive ? (
        <ButtonContainer>
          <div onClick={addQuestionItem}>
            <Plus /> <span className="first">선택지 추가</span>
          </div>
          <div>
            <Plus /> <span className="second">기타 추가</span>
          </div>
        </ButtonContainer>
      ) : null}
    </Container>
  );
};

export default SelectOptionContainer;

const Container = styled.div`
  margin-top: 4px;
  padding-bottom: 28px;
`;
const SelectionTitle = styled.span`
  ${Pretendard({ font: 1, weight: 700, color: Common.colors.GY500 })};
  line-height: 150%;
`;

const Input = styled.input`
  padding: 12px 15px;
  border-radius: 10px;
  height: 46px;
  background-color: ${Common.colors.GY50};
  border: none;
  width: 100%;
  &::placeholder {
    ${Pretendard({ font: 1.4, weight: 400, color: Common.colors.GY500 })};
    line-height: 17px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 18px;

  & div {
    display: flex;
    align-items: center;
    & .first {
      ${Pretendard({ font: 1.2, weight: 700, color: Common.colors.GY900 })};
      line-height: 150%;
    }
    & .second {
      ${Pretendard({ font: 1.2, weight: 400, color: Common.colors.GY900 })};
      line-height: 150%;
    }

    &:last-child {
      margin-left: 20px;
    }

    & svg {
      margin-right: 4px;
    }
  }
`;
