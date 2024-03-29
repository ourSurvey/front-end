import { memo } from 'react';
import styled from '@emotion/styled';
import { useRecoilState, useSetRecoilState } from 'recoil';
import Toggle from 'components/common/Toggle';
import More from 'public/icon/vertical-three-dots.svg';
import { qusetionListAtomFamily, targetAtom } from 'states/survey';
import { MoreModalIDAtom, targetQuestionListIDAtom, targetQuestionIDAtom, targetPartIdAtom } from 'states/surveyIds';
import { Common, Pretendard, SpaceBetween } from 'styles/common';
import { type QuestionListID, type SectionID } from 'types/survey';
import { QuestionIDFormat } from 'utills/getDateSixth';
import QusetionTitle from './QusetionTitle';
import SelectOptionContainer from './SelectOptionContainer';
interface IProps {
  questionId: number;
  color: string;
  partNumber: number;
  setVisibleMore: (bool: boolean) => void;
  id: QuestionListID; // 질문의 고유 ID
  targetQuestionList: QuestionListID; // 해당 질문들이 있는 배열의 ID값
  partId: SectionID;
  ListLength: number;
}
interface IStyle {
  color: string;
}

const Question = ({
  color,
  questionId,
  partNumber,
  setVisibleMore,
  id,
  targetQuestionList,
  partId,
  ListLength,
}: IProps) => {
  const [question, setQusetion] = useRecoilState(qusetionListAtomFamily(QuestionIDFormat(questionId + 1, partNumber)));
  const setQusetionId = useSetRecoilState(MoreModalIDAtom);
  const setQuestionListID = useSetRecoilState(targetQuestionListIDAtom);
  const setQuestiontID = useSetRecoilState(targetQuestionIDAtom);
  const setTargetPartID = useSetRecoilState(targetPartIdAtom);
  const setTarget = useSetRecoilState(targetAtom);
  const setMoreModal = () => {
    setTarget({ part: partNumber, question: questionId + 1 });
    setQusetionId(QuestionIDFormat(questionId + 1, partNumber));
    // 해당 질문이 있는 배열의 값을 저장
    setQuestionListID(targetQuestionList);
    // 질문의 고유 ID 값을 저장
    setQuestiontID(id);
    // 해당 파트의 ID값 설정
    setTargetPartID(partId);
    setVisibleMore(true);
  };

  return (
    <Container id={QuestionIDFormat(questionId + 1, partNumber)} className="question">
      <Header>
        <Title color={color}>
          <span className="part">PT{partNumber}</span>
          <span className="question-num">질문 {questionId + 1}.</span>
        </Title>
        <div className="right">
          <Toggle
            color={color}
            name="필수"
            question={question}
            setQuestion={setQusetion}
            id={QuestionIDFormat(questionId + 1, partNumber)}
          />
          <More onClick={setMoreModal} />
        </div>
      </Header>

      <TitleContainer>
        <QusetionTitle placeHolder="질문" value={question} setValue={setQusetion} hasImageInput={true} />
      </TitleContainer>
      <SelectOptionContainer
        questionAtomFamilyID={QuestionIDFormat(questionId + 1, partNumber)}
        ListLength={ListLength}
        hasNextSectionFlag={question.nextFl}
        partIndex={partNumber}
        questionIndex={questionId + 1}
        color={color}
      />
    </Container>
  );
};

export default memo(Question);

const Container = styled.div`
  background-color: #fff;
  padding: 37px 20px 0 20px;
`;

const Title = styled.div<IStyle>`
  & .part {
    ${(props) =>
      Pretendard({ font: 1, weight: 700, color: props.color === 'blue' ? Common.colors.BL500 : Common.colors.GR500 })};
    line-height: 150%;
    background-color: ${(props) => (props.color === 'blue' ? Common.colors.BL50 : Common.colors.GR50)};
    border-radius: 4px;
    padding: 1px 4px;
    margin-right: 4px;
  }

  & .question-num {
    ${Pretendard({ font: 1, weight: 700, color: Common.colors.GY700 })};
    line-height: 150%;
  }
`;

const Header = styled.div`
  ${SpaceBetween()}

  & .right {
    display: flex;
  }
  & svg {
    margin-left: 14px;
  }
`;

const TitleContainer = styled.div``;
