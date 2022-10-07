import { useLayoutEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Common, Pretendard, AlignAndJustifyCenter } from 'styles/common';
import Minus from 'public/icon/minus.svg';
import Plus from 'public/icon/plus-not-cicle.svg';
import { useRecoilState, useRecoilValue } from 'recoil';
import { surveyState, surveySelector } from 'states/survey';

const TImeTaken = () => {
  const [survey, setSurvey] = useRecoilState(surveyState);
  const [multipleSelectionCount, setmultipleSelectionCount] = useState(0); //객관식 숫자
  const [totalCount, settotalCount] = useState(0);
  const [totalMinute, settotalMinute] = useState(0);
  const questionsData = useRecoilValue(surveySelector);
  const timeSetting = (): string => {
    return ('00' + survey.minute).slice(-2);
  };

  useLayoutEffect(() => {
    //소요시간 계산
    const getTimeTaken = () => {
      let time = 0;
      let totalSelectionCount = 0;
      let multipleCount = 0;

      questionsData.sections.forEach((item) => {
        item.questions.forEach((question) => {
          totalSelectionCount++;

          if (question.multiFl === 0) {
            time += 8;
          } else {
            multipleCount++;

            time += 3;
          }
        });
      });

      setmultipleSelectionCount(multipleCount);
      settotalCount(totalSelectionCount);
      if (time % 60 === 0) {
        settotalMinute(time / 60);
      } else {
        settotalMinute(Math.ceil(time / 60));
      }
    };
    getTimeTaken();
    setSurvey({
      ...survey,
      minute: totalMinute,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TimeSet>
      <h1>설문에 모두 응답하려면 몇 분 정도 걸릴까요?</h1>
      <Description>소요 시간을 알려주면 설문 응답률, 완료율이 높아집니다.</Description>

      <TimerContainer>
        약&nbsp;
        <div className="container">
          <Minus onClick={() => setSurvey({ ...survey, minute: survey.minute - 1 })} />

          <span>{timeSetting()}</span>

          <Plus onClick={() => setSurvey({ ...survey, minute: survey.minute + 1 })} />
        </div>
        &nbsp;분 소요 예정
      </TimerContainer>
      <Tip>
        <span className="tip">TIP</span>
        <div className="des">
          지금 작성하신 설문은 대략 <span className="bold">{totalMinute}분</span> 정도 소요돼요. <br />
          질문 구성 : 객관식 {multipleSelectionCount}문항 & 주관식 {totalCount - multipleSelectionCount}문항
        </div>
      </Tip>
    </TimeSet>
  );
};

export default TImeTaken;

const TimeSet = styled.section`
  background-color: #fff;
  padding: 0 20px;
  padding-bottom: 32px;

  & h1 {
    padding-top: 32px;
  }
`;
const Description = styled.span`
  ${Pretendard({ font: 1.2, weight: 400, color: Common.colors.GY700 })};
  line-height: 150%;
`;

const TimerContainer = styled.div`
  display: flex;
  align-items: center;

  margin-top: 18px;
  & .container {
    display: flex;
    align-items: center;

    border: 1px solid ${Common.colors.GY300};
    border-radius: 10px;
    ${Pretendard({ font: 1.4, weight: 400, color: Common.colors.GY900 })};
    line-height: 150%;
  }

  & span {
    border-left: 1px solid ${Common.colors.GY300};
    border-right: 1px solid ${Common.colors.GY300};
    padding: 12px 6.5px;
  }

  & svg {
    margin: 0 5px;
  }
`;

const Tip = styled.div`
  margin-top: 18px;
  display: flex;
  align-items: center;

  & .tip {
    ${AlignAndJustifyCenter()};
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0.35)), #0066d9;
    width: 30px;
    height: 30px;
    border-radius: 20px;
    padding: 10px;
    margin-right: 6px;
    ${Pretendard({ font: 1, weight: 700, color: '#fff' })};
    line-height: 150%;
  }

  & .bold {
    ${Pretendard({ font: 1, weight: 700, color: Common.colors.GY700 })};
  }

  & .des {
    height: 30px;

    margin: 0;
    ${Pretendard({ font: 1, weight: 400, color: Common.colors.GY700 })};
    line-height: 150%;
  }
`;
