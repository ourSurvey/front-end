import React, { useState } from "react";
import SlideArrow from "public/icon/slide-arrow.svg";
import CloseCircle from "public/icon/close-circle.svg";
import styled from "@emotion/styled";
import { Common, Pretendard } from "styles/common";

const MultipleSelectionInput = () => {
  const [inputContent, setInputContent] = useState("");

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputContent(e.target.value);
  };
  return (
    <MultipleSelectionLi>
      <SlideArrow />
      <InputContainer>
        <input placeholder="선택지 입력" type="text" name="multiple-select-input" onChange={(e) => onChangeHandler(e)} />
        <CloseCircle />
      </InputContainer>
    </MultipleSelectionLi>
  );
};

export default MultipleSelectionInput;

const MultipleSelectionLi = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InputContainer = styled.div`
  position: relative;
  flex: 1;
  margin-left: 7px;
  & input {
    height: 46px;
    width: 100%;
    border: 1px solid ${Common.colors.GY300};
    border-radius: 10px;
    padding: 12px 15px;
    &::placeholder {
      ${Pretendard({ font: 1.4, weight: 400, color: Common.colors.GY500 })};
      letter-spacing: -0.03em;
    }
  }

  & svg {
    position: absolute;

    right: 15px;
    top: 13px;
  }
`;
