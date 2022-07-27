import React, { useState, useEffect } from "react";
import InputCss from "styles/components/Input.module.scss";
import { getFieldError } from "utills/validate";
import PasswordInput from "./PasswordInput";

interface IProps {
  name: string; //폼이 제출되었을 때 form.element에서 필드값을 찾는데 사용
  wasSubmitted: boolean; // 필드가 터치되지 않았더라도 에러 메시지를 표시해야 하는지 판단
  type: string; //input의 타입 지정
  className?: string;
  setValidate: (bool: boolean) => void;
}

function Input({ name, wasSubmitted, type, className, setValidate }: IProps) {
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);
  const [isVisiblePassword, setisVisiblePassword] = useState(false);
  const [inputType, setinputType] = useState("text"); //패스워드 버튼 눌렀을 때 변경 토글
  const errorMessage = getFieldError(value, name);
  const displayErrorMessage = (wasSubmitted || touched) && errorMessage;

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

  return (
    <div className={InputCss.inputContainer + className}>
      <label htmlFor={`${name}-input`}>{name}</label>
      <br />
      {type === "password" ? (
        <PasswordInput
          name={name}
          type={inputType}
          setValue={setValue}
          setTouched={setTouched}
          displayErrorMessage={displayErrorMessage}
          isVisible={isVisiblePassword}
          setisVisiblePassword={setisVisiblePassword}
        />
      ) : (
        <input
          id={`${name}-input`}
          name={name}
          type={type}
          onChange={(event) => setValue(event.currentTarget.value)}
          onBlur={() => setTouched(true)}
          aria-describedby={displayErrorMessage ? `${name}-error` : undefined}
        />
      )}

      {displayErrorMessage ? (
        <span role="alert" id={`${name}-error`} className={InputCss.errorMessage}>
          {errorMessage}
        </span>
      ) : null}
    </div>
  );
}

export default Input;
