import { useState } from 'react';
import styled from '@emotion/styled';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import Portal from 'components/common/Portal';
import ModalTemplate from 'components/modal/ModalTemplate';
import PartDeleteBody from 'components/modal/PartDeleteBody';
import { toastState } from 'states/modal';
import { qusetionListAtomFamily, templateSelector } from 'states/survey';
import {
  MoreModalIDAtom,
  targetQuestionListIDAtom,
  qusetionIdListAtom,
  targetQuestionIDAtom,
  targetPartIdAtom,
  sectionIdListAtom,
} from 'states/surveyIds';
import { Common, Pretendard } from 'styles/common';

interface IProps {
  setSideModal: (bool: boolean) => void;
}

interface IStyle {
  idx: number;
}

const MoreSelectionModal = ({ setSideModal }: IProps) => {
  const [deleteModal, setdeleteModal] = useState(false);
  const questionId = useRecoilValue(MoreModalIDAtom);
  const [question, setQusetion] = useRecoilState(qusetionListAtomFamily(questionId));
  const targetQuestion = useRecoilValue(targetQuestionListIDAtom);
  const [questionIdList, setQuestionIdList] = useRecoilState(qusetionIdListAtom(targetQuestion));
  const qusetionID = useRecoilValue(targetQuestionIDAtom);
  const [ToastState, setToastState] = useRecoilState(toastState);
  const targetPartID = useRecoilValue(targetPartIdAtom);
  const [partList, setPartList] = useRecoilState(sectionIdListAtom);
  const setTemplate = useSetRecoilState(templateSelector);

  const onToggleRandomFlag = () => {
    const flag: 0 | 1 = question.randomShowFl === 1 ? 0 : 1;
    setQusetion({
      ...question,
      randomShowFl: flag,
    });
  };

  const onToggleNextPartFlag = () => {
    setQusetion({
      ...question,
      nextFl: question.nextFl === 1 ? 0 : 1,
    });
  };

  const onDeleteQuestion = () => {
    // 리스트의 개수가 1이라면 파트 삭제
    // 아니라면 질문 삭제
    if (questionIdList.length === 1) {
      setPartList((arr) => arr.filter((item) => item !== targetPartID));
    } else {
      setQuestionIdList((list) => list.filter((item) => item !== qusetionID));
    }
    setdeleteModal(false);
    setSideModal(false);
    setTimeout(() => {
      setToastState({
        ...ToastState,
        text: '질문이 삭제 되었습니다.',
        visible: true,
        toastType: 'success',
        marginPosition: 0,
      });
    }, 1000);
  };

  return (
    <MoreOption>
      <Title idx={partList.indexOf(targetPartID) + 1}>
        <span className="part">PT{partList.indexOf(targetPartID) + 1}</span>
        <span className="question-num">질문 {questionIdList.indexOf(qusetionID) + 1}.</span>
      </Title>

      <div>
        <Container>
          <h6>선택지 옵션</h6>
          <SelectableSpan className={question.randomShowFl === 1 ? 'active' : ''} onClick={onToggleRandomFlag}>
            선택지 순서 무작위로 섞기
          </SelectableSpan>
          <SelectableSpan className={question.nextFl === 1 ? 'active' : ''} onClick={onToggleNextPartFlag}>
            답변을 기준으로 파트 이동
          </SelectableSpan>
        </Container>
        <Line></Line>
        <Container>
          <h6>질문 설정</h6>
          <span>이 질문 복사</span>
          <span
            onClick={() => {
              setdeleteModal(true);
            }}
          >
            삭제
          </span>
        </Container>
        <Line></Line>
        <Container>
          <h6>템플릿 사용</h6>
          <span
            onClick={() => {
              setTemplate('gender');
            }}
          >
            성별 질문
          </span>
          <span
            onClick={() => {
              setTemplate('birth');
            }}
          >
            나이 질문
          </span>
          <span
            onClick={() => {
              setTemplate('phone');
            }}
          >
            연락처 질문
          </span>
          <span
            onClick={() => {
              setTemplate('email');
            }}
          >
            이메일 질문
          </span>
        </Container>
      </div>
      {deleteModal && (
        <Portal selector="#portal">
          <ModalTemplate
            visibleState={deleteModal}
            setVisible={setdeleteModal}
            height={questionIdList.length > 1 ? 17 : 25}
          >
            <PartDeleteBody length={questionIdList.length} onDelete={onDeleteQuestion} setVisible={setdeleteModal} />
          </ModalTemplate>
        </Portal>
      )}
    </MoreOption>
  );
};

export default MoreSelectionModal;

const MoreOption = styled.aside`
  width: 100%;
  margin: 21.5px 0 35px 0;

  & .active {
    font-weight: 700 !important;
    &::before {
      content: url('images/checkedCheck.svg');
      margin-right: 4px;
      width: 10px;
    }
  }
`;

const Title = styled.div<IStyle>`
  padding-left: 18px;
  display: flex;
  & .part {
    ${(props) =>
      Pretendard({ font: 1, weight: 700, color: props.idx % 2 === 0 ? Common.colors.BL500 : Common.colors.GR500 })};
    line-height: 150%;
    background-color: ${(props) => (props.idx % 2 === 0 ? Common.colors.BL50 : Common.colors.GR50)};
    border-radius: 4px;
    padding: 1px 4px;
    margin-right: 4px;
  }

  & .question-num {
    ${Pretendard({ font: 1, weight: 700, color: Common.colors.GY700 })};
    line-height: 150%;
  }
`;

const Line = styled.div`
  width: 100%;
  height: 2px;
  background-color: ${Common.colors.GY50};
`;

const Container = styled.div`
  padding: 20px 18px;

  & h6 {
    margin: 0;
    ${Pretendard({ font: 1, weight: 700, color: Common.colors.GY500 })};
    line-height: 150%;

    margin-bottom: 14px;
  }

  & span {
    display: block;
    ${Pretendard({ font: 1.3, weight: 400, color: Common.colors.GY900 })};
    line-height: 150%;

    margin-bottom: 14px;
    text-align: left;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const SelectableSpan = styled.span`
  display: block;
  ${Pretendard({ font: 1.3, weight: 400, color: Common.colors.GY900 })};
  line-height: 150%;

  margin-bottom: 14px;
  text-align: left;
  &:last-child {
    margin-bottom: 0;
  }
`;
