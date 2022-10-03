import { useState, memo } from 'react';
import MultipleSelectionInput from './MultipleSelectionInput';
import Portal from 'components/common/Portal';
import ModalTemplate from 'components/modal/ModalTemplate';
import NextPartSelectionInSelectionInput from 'components/modal/NextPartSelectionInSelectionInput';
import { QuestionItemListID } from 'types/survey';

import Draggable from 'components/common/Draggable';
interface IProps {
  selectionNumber: number;
  questionId: number;
  partId: number;
  hasDeleteBtn: boolean;
  id: QuestionItemListID;
  idName: QuestionItemListID;
  hasNextSectionFlag: 0 | 1;
  ListLength: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}

const InputAndNextPartContainer = ({
  hasDeleteBtn,
  hasNextSectionFlag,
  selectionNumber,
  questionId,
  partId,
  id,
  ListLength,
  idName,
  moveCard,
}: IProps) => {
  const [showModalState, setshowModalState] = useState(false);

  return (
    <Draggable handleMove={moveCard} index={selectionNumber - 1} id={id}>
      <MultipleSelectionInput
        hasNextSectionFlag={hasNextSectionFlag}
        hasDeleteBtn={hasDeleteBtn}
        partId={partId}
        questionId={questionId}
        selectionNumber={selectionNumber}
        id={id} //해당 선택지 리스트에 대한 id값
        idName={idName} //선택지 리스트 안에 있는 고유 id 값
        setVisibleModal={setshowModalState}
        moveCard={moveCard}
      />
      <Portal selector="#portal">
        <ModalTemplate height={30} visibleState={showModalState} setVisible={setshowModalState}>
          <NextPartSelectionInSelectionInput
            questionNum={questionId}
            selectionNumber={selectionNumber}
            partLength={ListLength}
            partNum={partId}
            setVisible={setshowModalState}
          />
        </ModalTemplate>
      </Portal>
    </Draggable>
  );
};

export default memo(InputAndNextPartContainer);
