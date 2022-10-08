import { useCallback } from 'react';
import { deleteIDproperty } from 'utills/deleteIdProperty';
import update from 'immutability-helper';
import { surveySelector } from 'states/survey';
import { useRecoilState, useRecoilValue } from 'recoil';
import { qusetionItemIdListAtom } from 'states/surveyIds';
import { QuestionItemListID } from 'types/survey';
import { Reorder } from 'framer-motion';
import InputAndNextPartContainer from './InputAndNextPartContainer';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import { css } from '@emotion/react';
interface IProps {
  questionIndex: number;
  partIndex: number;
  sysCode: QuestionItemListID;
  hasNextSectionFlag: 0 | 1;
  ListLength: number;
}

const MultipleSelection = ({ questionIndex, partIndex, sysCode, hasNextSectionFlag, ListLength }: IProps) => {
  const [questionItemIdList, setQuestionItemIdList] = useRecoilState(qusetionItemIdListAtom(sysCode));
  const state = useRecoilValue(surveySelector);

  console.log('survey', state.sections[0].questions[0].questionItems, questionItemIdList);

  const onMove = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragInput = questionItemIdList[dragIndex];
      setQuestionItemIdList(
        update(questionItemIdList, {
          $splice: [
            [dragIndex, 1], // Delete
            [hoverIndex, 0, dragInput], // Add
          ],
        })
      );
    },
    [questionItemIdList]
  );

  const ulStyle = css`
    padding: 0;
    margin: 0;
    list-style-type: none;

    & li:not(:last-child) {
      margin-bottom: 18px;
    }
  `;

  return (
    <>
      <Reorder.Group axis="y" values={questionItemIdList} onReorder={setQuestionItemIdList} css={ulStyle}>
        {questionItemIdList.map((id, idx, arr) => (
          <InputAndNextPartContainer
            key={id}
            hasNextSectionFlag={hasNextSectionFlag}
            hasDeleteBtn={arr.length > 1}
            partId={partIndex}
            questionId={questionIndex}
            selectionNumber={idx + 1}
            id={sysCode} //해당 선택지 리스트에 대한 id값
            idName={id} //선택지 리스트 안에 있는 고유 id 값
            ListLength={ListLength}
          />
        ))}
      </Reorder.Group>
    </>
  );
};

export default MultipleSelection;
