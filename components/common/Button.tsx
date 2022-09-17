import styled from "@emotion/styled";

interface IProp {
  color: string;
  btnText: string;
  textColor: string;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: (e?: any) => void;
  isDisabled: boolean;
}

interface IBtnStyle {
  textColor: string;
  color: string;
  isDisabled: boolean;
}

export const Button = (props: IProp) => {
  const { color, textColor, isDisabled, onClick, btnText, type } = props;

  return (
    <ButtonContainer textColor={textColor} color={color} isDisabled={isDisabled} type={type} disabled={isDisabled} onClick={onClick}>
      {btnText}
    </ButtonContainer>
  );
};

const ButtonContainer = styled.button<IBtnStyle>`
  height: 50px;
  width: 100%;
  border-radius: 10px;
  font-family: Pretendard;
  font-weight: 700;
  font-size: 14px;
  font-style: normal;
  color: ${(props) => props.textColor};
  outline: 0;
  border: 0;
  padding-top: 16.5px;
  padding-bottom: 16.5px;
  background-color: ${(props) => props.color};
  opacity: ${(props) => (!props.isDisabled ? 1 : 0.35)};
`;
