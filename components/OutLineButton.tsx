import styled from "@emotion/styled";

type Props = {
  borderColor: string;
  btnText: string;
  textColor: string;
  onClick?: () => void;
  isDisabled: boolean;
};

const OutLineButton = (props: Props) => {
  const { borderColor, textColor, isDisabled, onClick, btnText } = props;

  const Button = styled.button`
    height: 50px;
    width: 100%;
    border: 1px solid ${borderColor};
    border-radius: 10px;
    font-family: Pretendard;
    font-weight: 400;
    font-size: 14px;
    font-style: normal;
    color: ${textColor};
    outline: 0;
    padding-top: 16.5px;
    padding-bottom: 16.5px;
    background-color: #fff;
  `;

  return (
    <Button disabled={isDisabled} onClick={onClick}>
      {btnText}
    </Button>
  );
};

export default OutLineButton;
