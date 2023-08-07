import { useState, memo, useRef, useEffect, forwardRef } from 'react';
import { css } from '@emotion/react';
import { useMotionValue, type DragControls, useDragControls, Reorder } from 'framer-motion';
import Portal from 'components/common/Portal';
import ModalTemplate from 'components/modal/ModalTemplate';
import NextPartSelectionInSelectionInput from 'components/modal/NextPartSelectionInSelectionInput';
import { SpaceBetween } from 'styles/common';
import { type QuestionItemListID } from 'types/survey';
import MultipleSelectionInput from './MultipleSelectionInput';

interface IProps {
  selectionNumber: number;
  questionId: number;
  partId: number;
  hasDeleteBtn: boolean;
  id: QuestionItemListID;
  idName: QuestionItemListID;
  hasNextSectionFlag: 0 | 1;
  ListLength: number;
}

interface ComponentProps {
  dragControls: DragControls;
}

const SlideArrow = forwardRef<any, ComponentProps>(({ dragControls }, ref) => (
  <svg
    width="15"
    height="16"
    viewBox="0 0 15 16"
    fill="none"
    onPointerDown={(event) => {
      dragControls.start(event);
    }}
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
  >
    <path d="M7.5 0.5L15 6.5H0L7.5 0.5Z" fill="#C2C5D0" />
    <path d="M7.5 15.5L0 9.5H15L7.5 15.5Z" fill="#C2C5D0" />
  </svg>
));

const InputAndNextPartContainer = ({
  hasDeleteBtn,
  hasNextSectionFlag,
  selectionNumber,
  questionId,
  partId,
  id,
  ListLength,
  idName,
}: IProps) => {
  const [showModalState, setshowModalState] = useState(false);
  const y = useMotionValue(0);
  const dragControls = useDragControls();
  const iRef = useRef<HTMLElement | null>(null);
  const WrappStyle = css`
    ${SpaceBetween()}
    align-items: center;
  `;
  useEffect(() => {
    const touchHandler: React.TouchEventHandler<HTMLElement> = (e) => {
      e.preventDefault();
    };
    const iTag = iRef.current;

    if (iTag != null) {
      // @ts-expect-error
      iTag.addEventListener('touchstart', touchHandler, { passive: false });

      return () => {
        // @ts-expect-error
        iTag.removeEventListener('touchstart', touchHandler, {
          passive: false,
        });
      };
    }
  }, [iRef]);

  return (
    <Reorder.Item
      css={WrappStyle}
      value={idName}
      id={idName}
      style={{ y }}
      dragListener={false}
      dragControls={dragControls}
    >
      <SlideArrow ref={iRef} dragControls={dragControls} />
      <MultipleSelectionInput
        hasNextSectionFlag={hasNextSectionFlag}
        hasDeleteBtn={hasDeleteBtn}
        partId={partId}
        questionId={questionId}
        selectionNumber={selectionNumber}
        id={id} // 해당 선택지 리스트에 대한 id값
        idName={idName} // 선택지 리스트 안에 있는 고유 id 값
        setVisibleModal={setshowModalState}
      />
      <Portal selector="#portal">
        <ModalTemplate height={30} visibleState={showModalState} setVisible={setshowModalState}>
          <NextPartSelectionInSelectionInput
            questionNum={questionId}
            selectionNumber={idName}
            partLength={ListLength}
            partNum={partId}
            setVisible={setshowModalState}
          />
        </ModalTemplate>
      </Portal>
    </Reorder.Item>
  );
};

export default memo(InputAndNextPartContainer);
