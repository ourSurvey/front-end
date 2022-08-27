import { useState } from "react";
import styled from "@emotion/styled";
import { Common, Pretendard } from "styles/common";
import MultipleSelection from "./MultipleSelection";
import Plus from "public/icon/plus.svg";
const SelectOptionContainer = () => {
  const [isActive, setIsActive] = useState("multiple");
  const [isMultipleAnswersPossible, setIsMultipleAnswersPossible] = useState(false);
  return (
    <Container>
      <SelectionTitle>선택지 입력</SelectionTitle>
      <SelectOption>
        <li onClick={() => setIsActive("multiple")} className={isActive === "multiple" ? "active" : ""}>
          객관식
        </li>
        <li onClick={() => setIsActive("answer")} className={isActive === "answer" ? "active" : ""}>
          주관식
        </li>
        <li className={isMultipleAnswersPossible ? "active" : ""} onClick={() => setIsMultipleAnswersPossible((prev) => !prev)}>
          중복 선택 가능
        </li>
      </SelectOption>
      <MultipleSelection />
      <ButtonContainer>
        <div>
          <Plus /> <span className="first">선택지 추가</span>
        </div>
        <div>
          <Plus /> <span className="second">기타 추가</span>
        </div>
      </ButtonContainer>
    </Container>
  );
};

export default SelectOptionContainer;

const Container = styled.div`
  margin-top: 28px;
`;
const SelectionTitle = styled.span`
  ${Pretendard({ font: 1, weight: 700, color: Common.colors.GY500 })};
  line-height: 150%;
  letter-spacing: -0.03em;
`;

const SelectOption = styled.ul`
  display: flex;
  list-style-type: none;
  position: relative;
  padding-left: 0;
  margin: 0;
  margin-top: 8px;
  margin-bottom: 18px;
  & li:not(:last-child) {
    margin-right: 5px;
  }

  & li {
    padding: 4px 8px;
    height: 26px;
    border-radius: 90px;
    ${Pretendard({ font: 1.2, weight: 400, color: Common.colors.GY700 })};
    border: 1px solid ${Common.colors.GY100};
    line-height: 150%;
    text-align: center;
    letter-spacing: -0.03em;
    transition: 0.5s;
  }

  & .active {
    background-color: ${Common.colors.GR500};
    ${Pretendard({ font: 1.2, weight: 700, color: "#fff" })};
    letter-spacing: -0.03em;
    line-height: 150%;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 18px;

  & div {
    display: flex;
    align-items: center;
    & .first {
      ${Pretendard({ font: 1.2, weight: 700, color: Common.colors.GY900 })};
      line-height: 150%;
      letter-spacing: -0.03em;
    }
    & .second {
      ${Pretendard({ font: 1.2, weight: 400, color: Common.colors.GY900 })};
      line-height: 150%;
      letter-spacing: -0.03em;
    }

    &:last-child {
      margin-left: 20px;
    }

    & svg {
      margin-right: 4px;
    }
  }
`;
