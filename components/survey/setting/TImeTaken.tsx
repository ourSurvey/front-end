import { useState } from "react";
import styled from "@emotion/styled";
import { Common, Pretendard } from "styles/common";
import Minus from "public/icon/minus.svg";
import Plus from "public/icon/plus-not-cicle.svg";

const TImeTaken = () => {
  const [takenTime, setTakenTime] = useState(1);

  const timeSetting = (): string => {
    return ("00" + takenTime).slice(-2);
  };
  return (
    <TimeSet>
      <h1>설문에 모두 응답하려면 몇 분 정도 걸릴까요?</h1>
      <Description>소요 시간을 알려주면 설문 응답률, 완료율이 높아집니다.</Description>

      <TimerContainer>
        약&nbsp;
        <div className="container">
          <Minus onClick={() => setTakenTime((prev) => prev - 1)} />

          <span>{timeSetting()}</span>

          <Plus onClick={() => setTakenTime((prev) => prev + 1)} />
        </div>
        &nbsp;분 소요 예정
      </TimerContainer>
      <Tip>
        <span className="tip">TIP</span>
        <div className="des">
          예시로 주관식 13개 & 객관식 45개 구성의 설문은 <br />
          <span className="bold">약 85분</span> 정도 소요돼요.
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
  letter-spacing: -0.03em;
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
    letter-spacing: -0.03em;
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
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0.35)), #0066d9;
    width: 30px;
    height: 30px;
    border-radius: 20px;
    padding: 10px;
    margin-right: 6px;
    ${Pretendard({ font: 1, weight: 700, color: "#fff" })};
    line-height: 150%;
    letter-spacing: -0.03em;
  }

  & .bold {
    ${Pretendard({ font: 1, weight: 700, color: Common.colors.GY700 })};
  }

  & .des {
    height: 30px;

    margin: 0;
    ${Pretendard({ font: 1, weight: 400, color: Common.colors.GY700 })};
    line-height: 150%;
    letter-spacing: -0.03em;
  }
`;
