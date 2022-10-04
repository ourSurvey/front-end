import { useRef } from 'react';
import { useDrag, useDrop, XYCoord, DropTargetMonitor } from 'react-dnd';
import styled from '@emotion/styled';
import type { Identifier } from 'dnd-core';
import _ from 'lodash';
const ItemTypes = {
  QUESTION_ITEM: 'questionItem',
};

interface IProps {
  handleMove: (dragIndex: number, hoverIndex: number) => void;
  index: any;
  id: string;
  children: React.ReactNode;
}

interface DragItem {
  index: number;
  id: string;
}

interface IStyle {
  isdragging: any;
}

const Draggable = ({ children, handleMove, index, id }: IProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const debounceHoverItem = _.debounce((item: DragItem, monitor: DropTargetMonitor) => {
    if (!ref.current) {
      return;
    }

    if (item.index === undefined) return;

    const dragIndex = item.index;
    const hoverIndex = index;
    console.log('아이템 오기 전', item, hoverIndex);
    //항목이 자기 자신이면 바꾸지 않는다.
    if (dragIndex === hoverIndex) {
      return;
    }

    //화면에서 사각형 결정
    const hoverBoundingRect = ref.current?.getBoundingClientRect();
    //수직 중간 가져오기
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    //마우스 위치 결정
    const clientOffset = monitor.getClientOffset();
    //픽셀을 맨 위로 가져오기
    if (clientOffset === null) return;
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // 마우스가 항목 높이의 절반을 넘었을 때만 이동을 수행합니다.
    // 아래로 드래그할 때 커서가 50% 미만일 때만 이동
    // 위로 드래그할 때 커서가 50% 이상일 때만 이동

    //아래로 드래그
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }
    //위로 드래그
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // 작업 수행
    handleMove(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    item.index = hoverIndex;
  }, 70);

  const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
    accept: ItemTypes.QUESTION_ITEM,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor: DropTargetMonitor) {
      debounceHoverItem(item, monitor);
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.QUESTION_ITEM,
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <DraggableWrapper ref={ref} data-handler-id={handlerId} isdragging={isDragging ? 1 : 0}>
      {children}
    </DraggableWrapper>
  );
};

export default Draggable;

const DraggableWrapper = styled.div<IStyle>`
  opacity: ${(props) => (props.isdragging ? 0.3 : 1)};
`;
