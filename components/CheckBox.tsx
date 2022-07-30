import React, { useState } from "react";
// import styled from "styled-components";
// import checkSvg from "public/images/check.svg";
// import checkedCheckSvg from "public/images/checkedCheck.svg";
import checkbox from "styles/components/CheckBox.module.scss";
interface IProps {
  text: string;
  checked: boolean;
  disabled?: boolean;
}

const CheckBox = ({ text, checked, disabled = false }: IProps) => {
  const defaultChecked = checked ? checked : false;
  const [isChecked, setIsChecked] = useState(defaultChecked);
  return (
    <div className={checkbox.checkboxWrapper}>
      <label>
        <input type="checkbox" checked={isChecked} onChange={() => setIsChecked((prev) => !prev)} disabled={disabled} />
        <span>{text}</span>
      </label>
    </div>
  );
};

export default CheckBox;

// const StyledLabel = styled.label`
//   position: relative;
//   display: flex;
//   align-items: center;
//   user-select: none;
//   cursor: default;

//   &:before {
//     display: block;
//     content: "";
//     width: 22px;
//     height: 22px;
//     border: 1.5px solid #c2c5d0;
//     border-radius: 6px;
//     background-color: white;
//     background-image: url("data:image/svg+xml,%3csvg width='11' height='8' viewBox='0 0 11 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M1 4L3.29289 6.29289C3.68342 6.68342 4.31658 6.68342 4.70711 6.29289L10 1' stroke='#0066D9' stroke-width='2' stroke-linecap='round'");
//     background-size: 100% 100%;
//     background-position: 50%;
//     background-repeat: no-repeat;
//   }

//   &:after {
//     position: absolute;
//     top: 50%;
//     left: 0;
//     transform: translateY(-50%);
//     display: block;
//     opacity: 0;
//     content: "";
//     width: 22px;
//     height: 22px;
//     border: 1.5px solid #c2c5d0;
//     border-radius: 6px;
//     background-image: url("data:image/svg+xml,%3csvg width='11' height='8' viewBox='0 0 11 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M1 4L3.29289 6.29289C3.68342 6.68342 4.31658 6.68342 4.70711 6.29289L10 1' stroke='#0066D9' stroke-width='2' stroke-linecap='round'");
//     background-size: 100% 100%;
//     background-position: 50%;
//     background-repeat: no-repeat;
//     background-color: limegreen;
//   }
// `;

// const StyledInput = styled.input`
//   position: absolute;
//   clip: rect(0 0 0 0);
//   clip-path: inset(50%);
//   height: 1px;
//   overflow: hidden;
//   white-space: nowrap;
//   width: 1px;

//   &:checked + ${StyledLabel} {
//     :after {
//       opacity: 1;
//     }
//   }
// `;

// const StyledP = styled.p`
//   margin-left: 0.25rem;
// `;
