import styled from '@emotion/styled';
import { Common, Pretendard, AlignAndJustifyCenter, SpaceBetween } from 'styles/common';
import QusetionTitle from './QusetionTitle';
import InvertedTriangle from 'public/icon/inverted-triangle.svg';
import Question from './Question';
import { memo, useRef, useState } from 'react';
import Copy from 'public/icon/copy.svg';
import Plus from 'public/icon/plus-two.svg';
import { sectionListAtomFamily } from 'states/survey';
import { sectionIdListAtom, qusetionIdListAtom } from 'states/surveyIds';
import { useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';
import { QuestionListID, SectionID } from 'types/survey';
import { PartIDFormat, QuestionListIDFormat } from 'utills/getDateSixth';
import useAutoScroll from 'hooks/useScroll';
import useScroll from 'hooks/useScroll';

interface IProps {
  PartNum: number;
  ListLength: number;
  setVisibleMore: (bool: boolean) => void;
  partID: SectionID;
}

interface IStyle {
  PartNum: number;
}

const Part = ({ PartNum, ListLength, setVisibleMore, partID }: IProps) => {
  const SyscodeFormat: QuestionListID = QuestionListIDFormat(PartNum + 1);
  const [partData, setPartData] = useRecoilState(sectionListAtomFamily(PartIDFormat(PartNum + 1)));
  const lastPart = useRecoilValue(sectionListAtomFamily(PartIDFormat(ListLength)));
  const questionIdList = useRecoilValue(qusetionIdListAtom(SyscodeFormat)); //질문들의 IDList
  const [hideList, setHideList] = useState(true);
  const { scrollPoint, moveScrollPoint } = useScroll();
  const listRef = useRef<HTMLDivElement>(null);
  const addPart = useRecoilCallback(({ snapshot, set }) => () => {
    const partIds = snapshot.getLoadable(sectionIdListAtom).getValue();
    //Syscode에서 마지막 숫자 가져오기
    const lastNumber = partIds[partIds.length - 1].slice(-1);
    set(sectionIdListAtom, [...partIds, PartIDFormat(Number(lastNumber) + 1)]);
  });

  const addQuestion = useRecoilCallback(({ snapshot, set }) => () => {
    const questionIds = snapshot.getLoadable(qusetionIdListAtom(SyscodeFormat)).getValue();
    const lastNumber = questionIds[questionIds.length - 1].slice(-1);
    set(sectionListAtomFamily(PartIDFormat(ListLength)), { ...lastPart, nextSection: ListLength - 1 });
    set(qusetionIdListAtom(SyscodeFormat), [
      ...questionIds,
      QuestionListIDFormat(Number(lastNumber) + 1),
    ] as QuestionListID[]);
    moveScrollPoint();
  });

  const foldList = () => {
    if (!listRef || !listRef.current) {
      return;
    }

    const style = listRef.current.style;

    if (hideList) {
      style.maxHeight = '0';
    } else {
      style.maxHeight = `${listRef.current.scrollHeight}px`;
    }
    setHideList((prev) => !prev);
  };

  return (
    <PartContainer>
      <header>
        <SubjectContainer>
          <PartTitle PartNum={PartNum}>
            <h1>PART {PartNum + 1}</h1>
            <span className="total-step">/{ListLength}</span>
          </PartTitle>
          <QusetionCount>
            <span>총 {questionIdList.length}개 질문</span>
            <InvertedTriangle transform={hideList ? 'rotate(180)' : 'rotate(0)'} onClick={foldList} />
          </QusetionCount>
        </SubjectContainer>
      </header>
      <div className="qustion-title">
        <QusetionTitle setValue={setPartData} value={partData} placeHolder="파트" hasImageInput={false} />
      </div>
      <Line></Line>
      <QusetionContainer className="content" ref={listRef}>
        {questionIdList.map((id, idx) => {
          return (
            <Question
              ListLength={ListLength}
              setVisibleMore={setVisibleMore}
              partNumber={PartNum + 1}
              questionId={idx}
              color={(PartNum + 1) % 2 === 0 ? 'pink' : 'green'}
              key={id}
              id={id}
              targetQuestionList={SyscodeFormat}
              partId={partID}
            />
          );
        })}
      </QusetionContainer>

      <PartButtonContainer>
        <button onClick={addPart}>
          <Copy stroke="#fff" />
          파트추가
        </button>
        <button onClick={addQuestion}>
          <Plus />
          질문 추가
        </button>
      </PartButtonContainer>
      {scrollPoint}
    </PartContainer>
  );
};

export default memo(Part);

const PartContainer = styled.section`
  width: 100%;

  padding-top: 30px;
  padding-bottom: 10px;
  background-color: #fff;

  & header,
  .qustion-title {
    padding: 0 20px;
  }

  & .content {
    overflow: hidden;
    transition: max-height 0.3s ease-out;
  }
`;

const PartTitle = styled.div<IStyle>`
  & h1 {
    display: inline;
    ${(props) =>
      Pretendard({
        font: 1.6,
        weight: 700,
        color: (props.PartNum + 1) % 2 === 0 ? Common.colors.PK500 : Common.colors.GR500,
      })};
    line-height: 150%;
  }
  & .total-step {
    ${Pretendard({ font: 1.2, weight: 400, color: Common.colors.GY300 })};
    line-height: 150%;
  }
`;

const Line = styled.div`
  width: 100%;
  height: 10px;
  background-color: ${Common.colors.GY50};
`;

const SubjectContainer = styled.div`
  ${SpaceBetween()}
`;

const QusetionCount = styled.div`
  & span {
    ${Pretendard({ font: 1, weight: 700, color: Common.colors.GY700 })};
    line-height: 150%;
  }
  & svg {
    margin-left: 6px;
  }
`;

const QusetionContainer = styled.div`
  background-color: ${Common.colors.GY50};

  & .question:not(:last-child) {
    margin-bottom: 10px;
  }
`;

const PartButtonContainer = styled.div`
  bottom: 0;
  position: relative;
  display: flex;
  width: 100%;
  background-color: ${Common.colors.GY500};

  & button {
    padding: 0;
    ${AlignAndJustifyCenter()}
    width: 50%;
    height: 50px;
    border: none;
    background-color: ${Common.colors.GY500};
    ${Pretendard({ font: 1.2, weight: 700, color: '#fff' })};
    line-height: 150%;

    & svg {
      margin-right: 6px;
    }

    &:first-of-type {
      &::after {
        position: absolute;
        content: '';
        width: 1px;
        height: 20px;
        background-color: #fff;
        right: 50%;
      }
    }
  }
`;
