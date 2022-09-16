import { useState } from "react";
import { Common, Pretendard } from "styles/common";
import styled from "@emotion/styled";
import Portal from "components/common/Portal";
import ModalTemplate from "components/common/ModalTemplate";
import PartDeleteBody from "./PartDeleteBody";
import {
  qusetionListAtomFamily,
  MoreModalAtom,
  targetQuestionListIDAtom,
  qusetionIdListAtom,
  targetQuestionIDAtom,
  targetPartIdAtom,
  sectionIdListAtom,
} from "states/survey";
import { toastState } from "states/modal";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { PartIDFormat } from "utills/getDateSixth";
interface IProps {
  setSideModal: (bool: boolean) => void;
}

const MoreSelectionModal = ({ setSideModal }: IProps) => {
  const [deleteModal, setdeleteModal] = useState(false);
  const questionId = useRecoilValue(MoreModalAtom);
  const [question, setQusetion] = useRecoilState(qusetionListAtomFamily(questionId));
  const targetQuestion = useRecoilValue(targetQuestionListIDAtom);
  const [questionIdList, setQuestionIdList] = useRecoilState(qusetionIdListAtom(targetQuestion));
  const qusetionID = useRecoilValue(targetQuestionIDAtom);
  const [ToastState, setToastState] = useRecoilState(toastState);
  const targetPartID = useRecoilValue(targetPartIdAtom);
  const setPartList = useSetRecoilState(sectionIdListAtom);

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
      hasNextPart: !question.hasNextPart,
    });
  };

  const onDeleteQuestion = () => {
    console.log(targetPartID);

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
        text: "질문이 삭제 되었습니다.",
        visible: true,
        toastType: "success",
      });
    }, 1000);
  };

  return (
    <MoreOption>
      <Title>
        <span className="part">PT1</span>
        <span className="question-num">질문 1.</span>
      </Title>

      <div>
        <Container>
          <h6>선택지 옵션</h6>
          <SelectableSpan className={question.randomShowFl === 1 ? "active" : ""} onClick={onToggleRandomFlag}>
            선택지 순서 무작위로 섞기
          </SelectableSpan>
          <SelectableSpan className={question.hasNextPart ? "active" : ""} onClick={onToggleNextPartFlag}>
            답변을 기준으로 파트 이동
          </SelectableSpan>
        </Container>
        <Line></Line>
        <Container>
          <h6>질문 설정</h6>
          <span>이 질문 복사</span>
          <span onClick={() => setdeleteModal(true)}>삭제</span>
        </Container>
        <Line></Line>
        <Container>
          <h6>템플릿 사용</h6>
          <span>성별 질문</span>
          <span>나이 질문</span>
          <span>연락처 질문</span>
          <span>이메일 질문</span>
        </Container>
      </div>
      {deleteModal && (
        <Portal selector="#portal">
          {/* <DeleteConfirm visibleState={deleteModal} setVisible={setdeleteModal} /> */}
          <ModalTemplate visibleState={deleteModal} setVisible={setdeleteModal} height={questionIdList.length > 1 ? 17 : 25}>
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
      content: url("images/checkedCheck.svg");
      margin-right: 4px;
      width: 10px;
    }
  }
`;

const Title = styled.div`
  padding-left: 18px;
  display: flex;
  & .part {
    ${Pretendard({ font: 1, weight: 700, color: Common.colors.GR500 })};
    line-height: 150%;
    background-color: ${Common.colors.GR50};
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
  /* width: calc(100% + 20 * 2);

  margin: 0 -20px 0 -20px; */
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
