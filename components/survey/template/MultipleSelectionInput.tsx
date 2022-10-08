import React, { useCallback } from 'react';
import CloseCircle from 'public/icon/close-circle.svg';
import styled from '@emotion/styled';
import { AlignAndJustifyCenter, Common, Pretendard, SpaceBetween } from 'styles/common';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { qusetionItemListAtomFamily } from 'states/survey';
import { qusetionItemIdListAtom } from 'states/surveyIds';
import { QuestionItemIDFormat } from 'utills/getDateSixth';
import { QuestionItemListID } from 'types/survey';
import Arrow from 'public/icon/underArrow.svg';

interface IProps {
  selectionNumber: number;
  questionId: number;
  partId: number;
  hasDeleteBtn: boolean;
  id: QuestionItemListID;
  idName: QuestionItemListID;
  hasNextSectionFlag: 0 | 1;
  setVisibleModal: (target: boolean) => void;
}

const MultipleSelectionInput = ({
  hasDeleteBtn,
  hasNextSectionFlag,
  selectionNumber,
  questionId,
  partId,
  id,
  setVisibleModal,
  idName,
}: IProps) => {
  const [inputContent, setInputContent] = useRecoilState(
    qusetionItemListAtomFamily(QuestionItemIDFormat(partId, questionId, selectionNumber))
  );

  const setSelectionList = useSetRecoilState(qusetionItemIdListAtom(id));

  const onChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputContent({
        ...inputContent,
        content: e.target.value,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [inputContent]
  );

  const onRemove = () => {
    setInputContent({ ...inputContent, content: '', nextSection: -1 });
    setSelectionList((id) => id.filter((item) => item !== idName));
  };
  return (
    <>
      <>
        {hasNextSectionFlag === 1 ? (
          <HaveNextPart>
            <input
              placeholder="선택지 입력"
              defaultValue={inputContent.content}
              type="text"
              name="multiple-select-input"
              onChange={(e) => onChangeHandler(e)}
            />
            {hasDeleteBtn ? <CloseCircle className="close-svg" onClick={onRemove} /> : null}
            <div onClick={() => setVisibleModal(true)} className="nexts">
              <strong>다음 파트</strong>로 진행하기
              <Arrow fill={Common.colors.GY700} />
            </div>
          </HaveNextPart>
        ) : (
          <InputContainer>
            <input
              placeholder="선택지 입력"
              defaultValue={inputContent.content}
              type="text"
              name="multiple-select-input"
              onChange={(e) => onChangeHandler(e)}
            />
            {hasDeleteBtn ? <CloseCircle onClick={onRemove} /> : null}
          </InputContainer>
        )}
      </>
    </>
  );
};

export default MultipleSelectionInput;

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

const HaveNextPart = styled.div`
  position: relative;
  flex: 1;
  margin-left: 7px;

  & input {
    height: 46px;
    width: 100%;
    border: 1px solid ${Common.colors.GY300};
    border-bottom: none;
    border-radius: 10px 10px 0px 0px;
    padding: 12px 15px;
    &::placeholder {
      ${Pretendard({ font: 1.4, weight: 400, color: Common.colors.GY500 })};
    }
    &:focus {
      outline-color: ${Common.colors.GY700};
    }
  }

  & .nexts {
    ${AlignAndJustifyCenter()};
    border: 1px solid ${Common.colors.GY300};
    background-color: ${Common.colors.GY100};
    ${Pretendard({ font: 1.2, weight: 400, color: Common.colors.GY900 })};
    border-radius: 0px 0px 10px 10px;
    padding: 5px 10px 5px 6px;

    & strong {
      ${Pretendard({ font: 1.2, weight: 700, color: Common.colors.GY900 })};
    }

    & svg {
      margin-left: 4px;
    }
  }

  & .close-svg {
    position: absolute;

    right: 15px;
    top: 13px;
  }
`;
