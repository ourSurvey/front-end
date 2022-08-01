import React, { useState } from "react";
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
