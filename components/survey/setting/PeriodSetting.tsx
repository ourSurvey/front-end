import styled from '@emotion/styled';
import { Common, Pretendard, SpaceBetween } from 'styles/common';
import { useRecoilValue } from 'recoil';
import { surveyState } from 'states/survey';
import { getDateFormat } from 'utills/getDateSixth';
interface IProps {
  setshowModalState: (bool: boolean) => void;
}

const PeriodSetting = ({ setshowModalState }: IProps) => {
  const { startDate, endDate } = useRecoilValue(surveyState);
  return (
    <>
      <Period>
        <h1>설문의 진행 기간을 설정해주세요.</h1>
        <div className="date-container" onClick={() => setshowModalState(true)}>
          <span>시작일</span>
          <div className="date" data-testid="startDate">
            {getDateFormat(startDate)}
          </div>
        </div>
        <div className="date-container" onClick={() => setshowModalState(true)}>
          <span>종료일</span>
          <div className="date" data-testid="endDate" placeholder="선택해주세요">
            {getDateFormat(endDate)}
          </div>
        </div>
      </Period>
    </>
  );
};

export default PeriodSetting;

const Period = styled.section`
  background-color: #fff;
  padding: 0 20px;
  padding-top: 24px;
  padding-bottom: 32px;
  & .date-container {
    ${SpaceBetween()}
    margin-top: 18px;
    & .date {
      padding: 12px 15px;
      border: 1px solid ${Common.colors.GY300};
      border-radius: 10px;
      ${Pretendard({ font: 1.4, weight: 400, color: Common.colors.GY900 })}
      line-height: 16px;
    }
  }
  & span {
    ${Pretendard({ font: 1.4, weight: 400, color: Common.colors.GY900 })}
  }
`;
