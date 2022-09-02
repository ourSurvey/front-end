import React, { useRef, useState } from "react";
import MultipleSelectionInput from "./MultipleSelectionInput";
import styled from "@emotion/styled";
import { Common, Pretendard } from "styles/common";
const MultipleSelection = () => {
  const [items, setItems] = useState([""]);
  const dragItem = useRef<any>(null);
  const dragOverItem = useRef<any>(null);

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
      {items.map((item: string, index: number) => {
        return (
          <MultipleSelectionInput
            hasDeleteBtn={item.length > 1}
            setItems={setItems}
            dragOverItem={dragOverItem}
            dragItem={dragItem}
            id={index}
            name={item}
            key={item}
            onDragEnd={handleSort}
          />
        );
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
