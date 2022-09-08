import React from "react";
import styled from "@emotion/styled";
import { Common, Pretendard } from "styles/common";

interface IProps {
  name?: string;
  toggle: boolean;
  setToggle: (e: boolean) => void;
  color: string;
}

type ColorProps = {
  mainColor: string;
};

const Toggle = ({ name, toggle, setToggle, color }: IProps) => {
  return (
    <ToggleSwitch mainColor={color}>
      <span>{name}</span>
      <label htmlFor="toggle" className="toggle-label">
        <input type="checkbox" checked={toggle} onChange={() => setToggle(!toggle)} id="toggle" />
        <div className="toggle-label-handle"></div>
      </label>
    </ToggleSwitch>
  );
};

export default Toggle;

const ToggleSwitch = styled.div<ColorProps>`
  display: flex;
  & span {
    margin-right: 2px;
    ${Pretendard({ font: 1.2, weight: 400, color: Common.colors.GY700 })}
    line-height: 150%;
    letter-spacing: -0.03em;
  }

  #toggle {
    display: none;
    &:checked + div {
      border: ${(props) => (props.mainColor === "pink" ? `1px solid ${Common.colors.PK500}` : `1px solid ${Common.colors.GR500}`)};
    }
    &:checked + div:after {
      right: calc(100% - 35px);
    }
    &:checked + .toggle-label-handle::after {
      background-color: ${(props) => (props.mainColor === "pink" ? Common.colors.PK500 : Common.colors.GR500)};
    }
  }

  #toggle .toggle-label {
    display: inline-block;
  }
  .toggle-label-handle {
    width: 30px;
    height: 18px;
    padding: 2.5px;
    border-radius: 20px;
    border: 1px solid ${Common.colors.GY300};
    background-color: white;
  }

  .toggle-label-handle::after {
    content: "";
    position: relative;
    right: 0;
    display: block;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background-color: ${Common.colors.GY200};
    transition: right 0.4s ease-in-out;
  }
`;
