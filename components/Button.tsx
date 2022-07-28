import React from "react";
import CSS from "csstype";

interface IProp {
  color: string;
  btnText: string;
  textColor: string;
  onClick?: () => void;
  isDisabled: boolean;
}

export const Button = (props: IProp) => {
  const { color, textColor, isDisabled, onClick, btnText } = props;
  const style: CSS.Properties = {
    height: "50px",
    width: "100%",
    backgroundColor: color,
    color: textColor,
    borderRadius: "10px",
    fontFamily: "Pretendard",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "14px",
    border: "0",
    outline: "0",
    paddingTop: "16.5px",
    paddingBottom: "16.5px",
  };
  return (
    <button disabled={isDisabled} style={style} onClick={onClick}>
      {btnText}
    </button>
  );
};
