import { useState, useEffect } from "react";
import UnVisibleEye from "public/images/unVisibleEye.svg";
import VisibleEye from "public/images/visibleEye.svg";
import styled from "@emotion/styled";
import { getFieldError } from "utills/validate";
import { Common, Pretendard } from "styles/common";

interface IProps {
  name: string; //폼이 제출되었을 때 form.element에서 필드값을 찾는데 사용
  wasSubmitted: boolean; // 필드가 터치되지 않았더라도 에러 메시지를 표시해야 하는지 판단
  placeHolder?: string;
  setValidate: (flag: boolean) => void;
}

const PasswordInput = (props: IProps) => {
  const { name, wasSubmitted, setValidate, placeHolder } = props;
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);
  const [inputType, setinputType] = useState("text"); //패스워드 버튼 눌렀을 때 변경 토글
  const [isVisiblePassword, setisVisiblePassword] = useState(false);
  const errorMessage = getFieldError(value, name);
  const displayErrorMessage = (wasSubmitted || touched) && errorMessage;
  const onClickVisibleIcon = (): void => {
    setisVisiblePassword(!isVisiblePassword);
  };

  useEffect(() => {
    const checkVal = (): void => {
      if (errorMessage === null) {
        setValidate(true);
      } else {
        setValidate(false);
      }
    };
    checkVal();
  }, [errorMessage]);

  useEffect(() => {
    const changeInputType = (): void => {
      if (isVisiblePassword) {
        setinputType("text");
      } else {
        setinputType("password");
      }
    };
    changeInputType();
  }, [isVisiblePassword]);

  return (
    <Container>
      <label htmlFor={`${name}-input`}>{name}</label>
      <br />
      <InputContainer>
        <input
          id={`${name}-input`}
          name={name}
          type={inputType}
          onChange={(event) => setValue(event.currentTarget.value)}
          onBlur={() => setTouched(true)}
          aria-describedby={displayErrorMessage ? `${name}-error` : undefined}
          placeholder={placeHolder !== undefined ? placeHolder : ""}
        />
        {isVisiblePassword ? (
          <VisibleEye onClick={onClickVisibleIcon} width="22" height="22" />
        ) : (
          <UnVisibleEye onClick={onClickVisibleIcon} width="22" height="22" />
        )}
      </InputContainer>

      {displayErrorMessage ? (
        <Span role="alert" id={`${name}-error`}>
          {errorMessage}
        </Span>
      ) : null}
    </Container>
  );
};

const Span = styled.span`
  ${Pretendard({ font: 1.2, weight: 400, color: Common.colors.alert500 })}
`;

const Container = styled.div`
  margin-bottom: 30px;
  & .inputContainer {
    position: relative;
    & svg {
      position: absolute;
      right: 15px;
      top: 12px;
    }
  }

  & input {
    padding: 14.5px 15px;
    border: 1px solid ${Common.colors.GY700};
    border-radius: 10px;
    height: 46px;
    width: 100%;
  }
  & input::placeholder {
    ${Pretendard({ font: 1.4, weight: 400, color: Common.colors.GY500 })}
  }
  & label {
    ${Pretendard({ font: 1.2, weight: 700, color: Common.colors.GY700 })}
  }
`;
const InputContainer = styled.div`
  position: relative;
  & svg {
    position: absolute;
    right: 15px;
    top: 12px;
  }
`;

export default PasswordInput;
