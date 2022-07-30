import React from "react";
import CSS from "csstype";

type Props = {
  borderColor: string;
  btnText: string;
  textColor: string;
  onClick?: () => void;
  isDisabled: boolean;
};

const OutLineButton = (props: Props) => {
  const { borderColor, textColor, isDisabled, onClick, btnText } = props;
  const style: CSS.Properties = {
    height: "50px",
    width: "100%",
    border: `1px solid ${borderColor}`,
    color: textColor,
    borderRadius: "10px",
    fontFamily: "Pretendard",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "14px",
    outline: "0",
    paddingTop: "16.5px",
    paddingBottom: "16.5px",
    backgroundColor: "#fff",
  };
  return (
    <button disabled={isDisabled} style={style} onClick={onClick}>
      {btnText}
    </button>
  );
};

export default OutLineButton;
