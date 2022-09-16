import React, { useCallback } from "react";
import SlideArrow from "public/icon/slide-arrow.svg";
import CloseCircle from "public/icon/close-circle.svg";
import styled from "@emotion/styled";
import { Common, Pretendard, SpaceBetween } from "styles/common";
import { useRecoilState, useSetRecoilState } from "recoil";
import { qusetionItemListAtomFamily, qusetionItemIdListAtom } from "states/survey";
import { QuestionItemIDFormat } from "utills/getDateSixth";
import { QuestionItemListID } from "types/survey";
interface IProps {
  selectionNumber: number;
  questionId: number;
  partId: number;
  onDragEnd: (e: React.TouchEvent<HTMLLIElement>) => void;
  hasDeleteBtn: boolean;
  id: QuestionItemListID;
  idName: QuestionItemListID;
  hasNextSectionFlag: boolean;
}

const MultipleSelectionInput = ({ hasDeleteBtn, onDragEnd, hasNextSectionFlag, selectionNumber, questionId, partId, id, idName }: IProps) => {
  const [inputContent, setInputContent] = useRecoilState(qusetionItemListAtomFamily(QuestionItemIDFormat(partId, questionId, selectionNumber)));
  const setSelectionList = useSetRecoilState(qusetionItemIdListAtom(id));

  const onChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputContent({
        ...inputContent,
        content: e.target.value,
      });
    },
    [inputContent]
  );

  const onRemove = () => {
    setSelectionList((id) => id.filter((item) => item !== idName));
  };
  return (
    <MultipleSelectionLi draggable onTouchMove={(e) => onDragEnd(e)} onDragOver={(e) => e.preventDefault()}>
      <SlideArrow />
      <InputContainer>
        <input placeholder="선택지 입력" type="text" name="multiple-select-input" onChange={(e) => onChangeHandler(e)} />
        {hasDeleteBtn ? <CloseCircle onClick={onRemove} /> : null}
      </InputContainer>
    </MultipleSelectionLi>
  );
};

export default MultipleSelectionInput;

const MultipleSelectionLi = styled.li`
  ${SpaceBetween()}
  align-items: center;
  cursor: move;
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
    }
    &:focus {
      outline-color: ${Common.colors.GY700};
    }
  }

  & svg {
    position: absolute;

    right: 15px;
    top: 13px;
  }
`;
