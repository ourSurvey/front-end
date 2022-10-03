import React, { useRef, useState, useCallback } from 'react';

import update from 'immutability-helper';
import styled from '@emotion/styled';
import { Common, Pretendard } from 'styles/common';
import { useRecoilState, useRecoilValue } from 'recoil';
import { qusetionItemIdListAtom, qusetionItemIdListSelectorFamily } from 'states/surveyIds';
import { QuestionItemListID } from 'types/survey';

import InputAndNextPartContainer from './InputAndNextPartContainer';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
interface IProps {
  questionIndex: number;
  partIndex: number;
  sysCode: QuestionItemListID;
  hasNextSectionFlag: 0 | 1;
  ListLength: number;
}

const MultipleSelection = ({ questionIndex, partIndex, sysCode, hasNextSectionFlag, ListLength }: IProps) => {
  const [questionItemIdList, setQuestionItemIdList] = useRecoilState(qusetionItemIdListAtom(sysCode));

  // console.log(questionList);
  const onMove = useCallback((dragIndex: number, hoverIndex: number) => {
    const dragInput = questionItemIdList[dragIndex];
    console.log(questionItemIdList, dragIndex, hoverIndex);
    setQuestionItemIdList(
      update(questionItemIdList, {
        $splice: [
          [dragIndex, 1], // Delete
          [hoverIndex, 0, dragInput], // Add
        ],
      })
    );

    // console.log(questionItemIdList);
  }, []);

  const renderInput = useCallback((id: QuestionItemListID, index: number, arr: QuestionItemListID[]) => {
    return (
      <InputAndNextPartContainer
        key={id}
        hasNextSectionFlag={hasNextSectionFlag}
        hasDeleteBtn={arr.length > 1}
        partId={partIndex}
        questionId={questionIndex}
        selectionNumber={index + 1}
        id={sysCode} //해당 선택지 리스트에 대한 id값
        idName={id} //선택지 리스트 안에 있는 고유 id 값
        ListLength={ListLength}
        moveCard={onMove}
      />
    );
  }, []);

  return (
    <DndProvider backend={TouchBackend}>
      <Option>{questionItemIdList.map((id, idx, arr) => renderInput(id, idx, arr))}</Option>
    </DndProvider>
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
