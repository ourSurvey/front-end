import React, { useRef, useState } from "react";
import MultipleSelectionInput from "./MultipleSelectionInput";
import styled from "@emotion/styled";
import { Common, Pretendard } from "styles/common";
import { useRecoilValue } from "recoil";
import { qusetionItemIdListAtom } from "states/survey";
import { QuestionItemListID } from "types/survey";
import { PartIDFormat, QuestionIDFormat } from "utills/getDateSixth";
interface IProps {
  questionIndex: number;
  partIndex: number;
}

const MultipleSelection = ({ questionIndex, partIndex }: IProps) => {
  const PartFormat = PartIDFormat(partIndex);
  const QuestionFormat = QuestionIDFormat(questionIndex + 1);
  const SyscodeFormat = `${PartFormat}${QuestionFormat}` as QuestionItemListID;
  const [items, setItems] = useState([""]);
  const dragItem = useRef<any>(null);
  const dragOverItem = useRef<any>(null);

  const questionItemIdList = useRecoilValue(qusetionItemIdListAtom(SyscodeFormat));
  console.log(`questionIndex: ${questionIndex}, partIndex:${partIndex}`, questionItemIdList);

  const handleSort = (e: React.TouchEvent<HTMLLIElement>) => {
    console.log(e.targetTouches[0]);

    let _question = [...items];

    const draggedItemContent = _question.splice(dragItem.current, 1)[0];

    //위치 변경
    _question.splice(dragOverItem.current, 0, draggedItemContent);

    dragItem.current = null;
    dragOverItem.current = null;

    setItems(_question);
  };

  return (
    <Option>
      {questionItemIdList.map((id, idx, arr) => {
        return <MultipleSelectionInput key={id} hasDeleteBtn={arr.length > 1} id={idx} onDragEnd={handleSort} />;
      })}
    </Option>
  );
};

export default MultipleSelection;

const Option = styled.ul`
  padding: 0;
  margin: 0;
  list-style-type: none;

  & li:not(:last-child) {
    margin-bottom: 18px;
  }
`;
