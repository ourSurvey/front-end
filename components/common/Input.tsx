import { useState, useEffect } from "react";
import { getFieldError } from "utills/validate";
import styled from "@emotion/styled";
import { Common, Pretendard } from "styles/common";

interface IProps {
  name: string; //폼이 제출되었을 때 form.element에서 필드값을 찾는데 사용
  wasSubmitted: boolean; // 필드가 터치되지 않았더라도 에러 메시지를 표시해야 하는지 판단
  type: string; //input의 타입 지정
  setValidate: (bool: boolean) => void;
  placeHolder?: string;
}

function Input({ name, wasSubmitted, type, placeHolder, setValidate }: IProps) {
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);

  const errorMessage = getFieldError(value, name);
  const displayErrorMessage = (wasSubmitted || touched) && errorMessage;

  useEffect(() => {
    const checkVal = (): void => {
      if (errorMessage === null) {
        setValidate(true);
      } else {
        setValidate(false);
      }
    };
    checkVal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorMessage]);

  return (
    <Container>
      <label htmlFor={`${name}-input`}>{name}</label>
      <br />

      <input
        id={`${name}-input`}
        name={name}
        type={type}
        onChange={(event) => setValue(event.currentTarget.value)}
        onBlur={() => setTouched(true)}
        aria-describedby={displayErrorMessage ? `${name}-error` : undefined}
        placeholder={placeHolder !== undefined ? placeHolder : ""}
      />

      {displayErrorMessage ? (
        <ErrorMessage role="alert" id={`${name}-error`}>
          {errorMessage}
        </ErrorMessage>
      ) : null}
    </Container>
  );
}

const Container = styled.div`
  margin-bottom: 30px;
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

const ErrorMessage = styled.span`
  ${Pretendard({ font: 1.2, weight: 400, color: Common.colors.alert500 })}
`;

export default Input;
