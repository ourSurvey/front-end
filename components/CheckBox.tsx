import { useState } from "react";
import styled from "@emotion/styled";
import { Common, Pretendard } from "styles/common";
interface IProps {
  text: string;
  checked: boolean;
  disabled?: boolean;
}

const CheckBox = ({ text, checked, disabled = false }: IProps) => {
  const defaultChecked = checked ? checked : false;
  const [isChecked, setIsChecked] = useState(defaultChecked);
  return (
    <CheckboxWrapper>
      <label>
        <input type="checkbox" checked={isChecked} onChange={() => setIsChecked((prev) => !prev)} disabled={disabled} />
        <Span>{text}</Span>
      </label>
    </CheckboxWrapper>
  );
};

export default CheckBox;

const CheckboxWrapper = styled.div`
  position: relative;
  & input[type="checkbox"] {
    -webkit-appearance: none;
    appearance: none;
    /* creating a custom design */
    width: 1.375rem;
    height: 1.375rem;
    border-radius: 0.375rem;
    background-image: url("images/check.svg");
    background-size: 50% 50%;
    background-position: 50%;
    background-repeat: no-repeat;
    border: 1px solid #c2c5d0;
    outline: none;
    cursor: pointer;

    &:checked {
      background-image: url("images/checkedCheck.svg");
      background-size: 50% 50%;
      background-position: 50%;
      background-repeat: no-repeat;
    }
  }
  & input[type="checkbox"]:disabled {
    border-color: ${Common.colors.GY100};
    background-color: ${Common.colors.GY100};
  }
  & input[type="checkbox"]:disabled + span {
    color: ${Common.colors.GY100};
  }
`;

const Span = styled.span`
  ${Pretendard({ font: 1.4, weight: 400, color: Common.colors.GY900 })}
  position: absolute;
  margin-left: 6px;
  top: -3px;
  cursor: pointer;
`;
