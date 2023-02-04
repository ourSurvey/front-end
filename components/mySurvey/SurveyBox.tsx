import styled from '@emotion/styled';
import { Button } from 'components/common/Button';
import { Common, Pretendard } from 'styles/common';
import { compareToday } from 'utills/getDateSixth';

interface IProps {
  startDate: string; //시작일
  endDate: string; //종료일
  subject: string; //제목
  replyCount: number; //응답자 수
}

interface IStyle {
  type: 'expectation' | 'proceed' | 'end';
}

interface IButtonContainer extends IStyle {
  replyCount: number;
}

interface IDueDate {
  date: number;
}

const SurveyBox = ({
  startDate = '2023.01.22',
  endDate = '2023.01.31',
  subject = '편의점 라면 소비 패턴 조사를 위한 설문',
  replyCount = 123,
}: IProps) => {
  const type = {
    expectation: '예정',
    proceed: '진행 중',
    end: '종료',
  };

  //남은 종료일을 계산해서 계산일 리턴
  const endDateCalculation = (endDate: string): number => {
    const startDay = new Date();
    const endDay = new Date(+endDate.substring(0, 4), +endDate.substring(5, 7) - 1, +endDate.substring(8, 10));

    const diffDate = endDay.getTime() - startDay.getTime();
    const diffDay = Math.floor(diffDate / (1000 * 60 * 60 * 24)); //일로 변경
    return diffDay;
  };

  return (
    <BoxContainer className="survey-box">
      <DueDateBalloon date={endDateCalculation(endDate)}>
        종료까지 D-{endDateCalculation(endDate) === 0 ? 'DAY' : endDateCalculation(endDate)}
        <div className="ribon-container">
          <div className="triangle1"></div>
          <div className="triangle2"></div>
        </div>
      </DueDateBalloon>
      <BoxHeader>
        <span className="dates">
          {startDate}~{endDate}
        </span>
        <Status type={compareToday(startDate, endDate)}>{type[compareToday(startDate, endDate)]}</Status>
      </BoxHeader>
      <Subject>{subject}</Subject>
      <ReplyCount>{replyCount > 0 ? `응답자 ${replyCount}명` : '아직 응답자가 없습니다.'}</ReplyCount>
      <ButtonContainer type={compareToday(startDate, endDate)} replyCount={replyCount}>
        <Button
          id="pull-up"
          testId="pull-up"
          isDisabled={false}
          fontFamily="pretendard"
          fontSize={1.2}
          fontWeight={400}
          textColor={Common.colors.BL500}
          color="transparent"
          btnText="끌어올리기"
          wUnit="px"
          width={100}
          height={30}
        />
        <Button
          id="result-btn"
          testId="result-btn"
          fontFamily="pretendard"
          isDisabled={replyCount === 0}
          fontSize={1.2}
          fontWeight={400}
          textColor={Common.colors.GY900}
          color="transparent"
          btnText="결과보기"
          wUnit="px"
          width={100}
          height={30}
        />
      </ButtonContainer>
    </BoxContainer>
  );
};

export default SurveyBox;

const BoxContainer = styled.div`
  padding: 15px;
  border-radius: 0.875rem;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.16);
  position: relative;
`;

const BoxHeader = styled.div`
  display: flex;
  justify-content: space-between;

  & .dates {
    ${Pretendard({ font: 1, color: Common.colors.GY500, weight: 400 })};
  }
`;

const Subject = styled.p`
  ${Pretendard({ weight: 700, font: 1.6, color: Common.colors.GY900 })};
  line-height: 150%;
  margin-bottom: 5px;
  overflow: hidden;
  white-space: normal;
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

const ReplyCount = styled.span`
  ${Pretendard({ weight: 400, font: 1.2, color: Common.colors.GY700 })};
  line-height: 150%;
`;

const Status = styled.span<IStyle>`
  ${Pretendard({ weight: 700, font: 1, color: Common.colors.GR500 })};
  color: ${({ type }) => {
    if (type === 'proceed') {
      return Common.colors.GR500;
    } else if (type === 'end') {
      return Common.colors.GY700;
    } else {
      return Common.colors.GY500;
    }
  }};
`;

const ButtonContainer = styled.div<IButtonContainer>`
  display: ${({ type }) => (type === 'expectation' ? 'none' : 'flex')};
  margin-top: 10px;
  & button:first-of-type {
    display: ${({ type }) => (type === 'proceed' ? 'block' : 'none')};
    border: 1px solid ${Common.colors.BL500};
    border-radius: 5px;
    margin-right: 10px;
  }
  & #result-btn {
    border: ${({ replyCount }) => (replyCount === 0 ? 'none' : `1px solid ${Common.colors.GY900}`)};
    border-radius: 5px;
    background-color: ${({ replyCount }) => (replyCount === 0 ? Common.colors.GY50 : 'transparent')};
    color: ${({ replyCount }) => (replyCount === 0 ? Common.colors.GY500 : Common.colors.GY900)};
  }
`;

const DueDateBalloon = styled.div<IDueDate>`
  height: 24px;
  display: ${({ date }) => (date >= 0 && date <= 3 ? 'flex' : 'none')};
  background: linear-gradient(0deg, rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0.35)), #0066d9;
  position: absolute;
  top: -12px;
  left: 0;
  border-radius: 10px 0px 0px 0px;
  padding: 4px 10px 4px 15px;
  ${Pretendard({ weight: 700, font: 1, color: '#fff' })};
  line-height: 150%;

  & .ribon-container {
    position: relative;
  }

  & .triangle1 {
    position: absolute;
    width: 0;
    height: 0;
    right: -22px;
    top: 8px;
    border-bottom: 6px solid #599be6;
    border-top: 6px solid transparent;
    border-left: 6px solid #599be6;
    border-right: 6px solid transparent;
  }
  & .triangle2 {
    position: absolute;
    width: 0;
    height: 0;
    right: -22px;
    top: -4px;
    border-bottom: 6px solid transparent;
    border-top: 6px solid #599be6;
    border-left: 6px solid #599be6;
    border-right: 6px solid transparent;
  }
`;
