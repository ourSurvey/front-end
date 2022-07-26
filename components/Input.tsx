import React, { useState } from "react";
import InputCss from "styles/components/Input.module.scss";
import { emailValidate, pNumValidate, passwordValidate } from "utills/validate";

interface IProps {
  name: string; //폼이 제출되었을 때 form.element에서 필드값을 찾는데 사용
  wasSubmitted: boolean; // 필드가 터치되지 않았더라도 에러 메시지를 표시해야 하는지 판단
  type: string; //input의 타입 지정
  className?: string;
}

//터치 호버 풀었을 때 유효성검사 메시지 출력
function getFieldError(value: string | undefined, name: string) {
  if (!value) return "field is required";

  switch (name) {
    case "email":
  }
  return null;
}

function Input({ name, wasSubmitted, type, className }: IProps) {
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);

  const errorMessage = getFieldError(value, name);
  const displayErrorMessage = (wasSubmitted || touched) && errorMessage;

  return (
    <div className={InputCss.inputContainer + className}>
      <label htmlFor={`${name}-input`}>{name}</label>
      <br />
      <input
        id={`${name}-input`}
        name={name}
        type={type}
        onChange={(event) => setValue(event.currentTarget.value)}
        onBlur={() => setTouched(true)}
        aria-describedby={displayErrorMessage ? `${name}-error` : undefined}
      />
      {displayErrorMessage ? (
        <span role="alert" id={`${name}-error`} className="error-message">
          {errorMessage}
        </span>
      ) : null}
    </div>
  );
}

export default Input;
