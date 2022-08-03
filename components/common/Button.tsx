import styled from "@emotion/styled";

interface IProp {
  color: string;
  btnText: string;
  textColor: string;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: (e?: any) => void;
  isDisabled: boolean;
}

export const Button = (props: IProp) => {
  const { color, textColor, isDisabled, onClick, btnText, type } = props;

  const Button = styled.button`
    height: 50px;
    width: 100%;
    border-radius: 10px;
    font-family: Pretendard;
    font-weight: 700;
    font-size: 14px;
    font-style: normal;
    color: ${textColor};
    outline: 0;
    border: 0;
    padding-top: 16.5px;
    padding-bottom: 16.5px;
    background-color: ${color};
    opacity: ${!isDisabled ? 1 : 0.35};
  `;

  return (
    <Button type={type} disabled={isDisabled} onClick={onClick}>
      {btnText}
    </Button>
  );
};
