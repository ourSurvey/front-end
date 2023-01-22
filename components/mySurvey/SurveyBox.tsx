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

  return (
    <BoxContainer className="survey-box">
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
          isDisabled={false}
          fontFamily="pretendard"
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
  margin-top: 10px;
  & button:first-of-type {
    border: 1px solid ${Common.colors.BL500};
    border-radius: 5px;
    margin-right: 10px;
  }
  & #result-btn {
    border: 1px solid ${Common.colors.GY900};
    border-radius: 5px;
  }
`;
