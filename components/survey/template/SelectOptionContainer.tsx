import { useState } from "react";
import styled from "@emotion/styled";
import { Common, Pretendard } from "styles/common";
import MultipleSelection from "./MultipleSelection";
import ImageUpload from "./ImageUpload";
const SelectOptionContainer = () => {
  const [isActive, setIsActive] = useState("multiple");
  const [isMultipleAnswersPossible, setIsMultipleAnswersPossible] = useState(false);
  return (
    <div>
      선택지 입력
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
      <ImageUpload />
    </div>
  );
};

export default SelectOptionContainer;

const SelectOption = styled.ul`
  display: flex;
  list-style-type: none;
  position: relative;
  padding-left: 0;
  margin: 0;
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
