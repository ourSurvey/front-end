import styled from "@emotion/styled";

interface IProp {
  color: string;
  btnText: string;
  textColor: string;
  onClick?: () => void;
  isDisabled: boolean;
}

export const Button = (props: IProp) => {
  const { color, textColor, isDisabled, onClick, btnText } = props;

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
  `;

  return (
    <Button disabled={isDisabled} onClick={onClick}>
      {btnText}
    </Button>
  );
};
