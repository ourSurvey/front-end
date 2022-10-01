import { useState } from 'react';
import MultipleSelectionInput from './MultipleSelectionInput';
import Portal from 'components/common/Portal';
import ModalTemplate from 'components/modal/ModalTemplate';
import NextPartSelectionInSelectionInput from 'components/modal/NextPartSelectionInSelectionInput';
import { QuestionItemListID } from 'types/survey';
interface IProps {
  selectionNumber: number;
  questionId: number;
  partId: number;
  onDragEnd: (e: React.TouchEvent<HTMLLIElement>) => void;
  hasDeleteBtn: boolean;
  id: QuestionItemListID;
  idName: QuestionItemListID;
  hasNextSectionFlag: 0 | 1;
  ListLength: number;
}

const InputAndNextPartContainer = ({
  hasDeleteBtn,
  onDragEnd,
  hasNextSectionFlag,
  selectionNumber,
  questionId,
  partId,
  id,
  ListLength,
  idName,
}: IProps) => {
  const [showModalState, setshowModalState] = useState(false);

  return (
    <>
      <MultipleSelectionInput
        hasNextSectionFlag={hasNextSectionFlag}
        hasDeleteBtn={hasDeleteBtn}
        partId={partId}
        questionId={questionId}
        selectionNumber={selectionNumber}
        onDragEnd={onDragEnd}
        id={id} //해당 선택지 리스트에 대한 id값
        idName={idName} //선택지 리스트 안에 있는 고유 id 값
        setVisibleModal={setshowModalState}
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
    </>
  );
};

export default InputAndNextPartContainer;
