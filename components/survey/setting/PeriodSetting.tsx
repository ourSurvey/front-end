import styled from "@emotion/styled";
import { Common, Pretendard } from "styles/common";

const PeriodSetting = () => {
  return (
    <Period>
      <h1>설문의 진행 기간을 설정해주세요.</h1>
      <div className="date-container">
        <span>시작일</span>
        <div className="date">2022.07.25</div>
      </div>
      <div className="date-container">
        <span>종료일</span>
        <div className="date" placeholder="선택해주세요">
          2022.07.25
        </div>
      </div>
    </Period>
  );
};

export default PeriodSetting;

const Period = styled.section`
  background-color: #fff;
  padding: 0 20px;
  padding-top: 24px;
  & .date-container {
    display: flex;
    justify-content: space-between;
    margin-top: 18px;
    & .date {
      padding: 12px 15px;
      border: 1px solid ${Common.colors.GY300};
      border-radius: 10px;
      ${Pretendard({ font: 1.4, weight: 400, color: Common.colors.GY900 })}
      line-height: 16px;
      letter-spacing: -0.03em;
    }
  }
  & span {
    ${Pretendard({ font: 1.4, weight: 400, color: Common.colors.GY900 })}
  }
`;
