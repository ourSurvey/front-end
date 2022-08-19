import Prev from "public/icon/prevArrow.svg";
import styled from "@emotion/styled";
import { Common, Pretendard } from "styles/common";
import { useRouter } from "next/router";
type Props = {
  step: string;
  name: string;
};

const CreateSurveyHeader = ({ step, name }: Props) => {
  const router = useRouter();
  const Span = styled.p`
    ${Pretendard({ font: 1.4, weight: 700, color: Common.colors.GY900 })};
    letter-spacing: -0.03em;
    line-height: 150%;
    display: flex;
    align-items: center;
    margin: 0;
    vertical-align: middle;
  `;

  return (
    <Header>
      <Prev width="20" height="16" />

      <Span>{name}</Span>
      <StepPosition>
        STEP {step}
        <span className="total">/03</span>
      </StepPosition>
    </Header>
  );
};

export default CreateSurveyHeader;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 0 20px 15px 20px;
  margin-bottom: 28px;
  border-bottom: 1px solid ${Common.colors.GY100};
  width: calc(100% + 20 * 2);

  margin: 0 -20px 0 -20px;
  & svg {
    -webkit-transform: translateY(25%);
    -ms-transform: translateY(25%);
    transform: translateY(25%);
  }
`;

const StepPosition = styled.span`
  ${Pretendard({ font: 1, weight: 700, color: Common.colors.GY900 })};

  & .total {
    ${Pretendard({ font: 1, weight: 400, color: Common.colors.GY500 })};
  }
`;
