import styled from '@emotion/styled';

type Props = {
  borderColor: string;
  btnText: string;
  textColor: string;
  onClick?: () => void;
  isDisabled: boolean;
};

interface IStyle {
  borderColor: string;
  textColor: string;
}

const OutLineButton = (props: Props) => {
  const { borderColor, textColor, isDisabled, onClick, btnText } = props;

  return (
    <ButtonContainer borderColor={borderColor} textColor={textColor} disabled={isDisabled} onClick={onClick}>
      {btnText}
    </ButtonContainer>
  );
};

export default OutLineButton;

const ButtonContainer = styled.button<IStyle>`
  height: 50px;
  width: 100%;
  border: 1px solid ${(props) => props.borderColor};
  border-radius: 10px;
  font-family: Pretendard;
  font-weight: 400;
  font-size: 14px;
  font-style: normal;
  color: ${(props) => props.textColor};
  outline: 0;
  padding-top: 16.5px;
  padding-bottom: 16.5px;
  background-color: #fff;
`;
