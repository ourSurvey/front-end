import Prev from "public/icon/prevArrow.svg";
import styled from "@emotion/styled";
import { Common, Pretendard } from "styles/common";
import { useRouter } from "next/router";
import { memo } from "react";
type Props = {
  step: string;
  name: string;
  hasUnderLine: boolean;
};

const CreateSurveyHeader = ({ step, name, hasUnderLine }: Props) => {
  const router = useRouter();
  const Span = styled.p`
    ${Pretendard({ font: 1.4, weight: 700, color: Common.colors.GY900 })};

    line-height: 150%;
    display: flex;
    align-items: center;
    margin: 0;
    vertical-align: middle;
  `;

  const Header = styled.header`
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    padding: 21.5px 20px 15px 34px;

    border-bottom: ${hasUnderLine ? `1px solid ${Common.colors.GY100}` : "none"};

    & svg {
      -webkit-transform: translateY(25%);
      -ms-transform: translateY(25%);
      transform: translateY(25%);
    }
  `;

  return (
    <Header>
      <Prev width="20" height="16" onClick={() => router.back()} />

      <Span>{name}</Span>
      <StepPosition>
        STEP {step}
        <span className="total">/03</span>
      </StepPosition>
    </Header>
  );
};

export default memo(CreateSurveyHeader);

const StepPosition = styled.span`
  ${Pretendard({ font: 1, weight: 700, color: Common.colors.GY900 })};

  & .total {
    ${Pretendard({ font: 1, weight: 400, color: Common.colors.GY500 })};
  }
`;
