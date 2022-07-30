import React, { useState, useEffect } from "react";
import PasswordInputCss from "styles/components/PasswordInputCss.module.scss";
import UnVisibleEye from "public/images/unVisibleEye.svg";
import VisibleEye from "public/images/visibleEye.svg";
import { getFieldError } from "utills/validate";

interface IProps {
  name: string; //폼이 제출되었을 때 form.element에서 필드값을 찾는데 사용
  wasSubmitted: boolean; // 필드가 터치되지 않았더라도 에러 메시지를 표시해야 하는지 판단
  className?: string;
  setValidate: (flag: boolean) => void;
}

const PasswordInput = (props: IProps) => {
  const { name, wasSubmitted, setValidate, className } = props;
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
    <div className={PasswordInputCss.container + className}>
      <label htmlFor={`${name}-input`}>{name}</label>
      <br />
      <div className={PasswordInputCss.inputContainer}>
        <input
          id={`${name}-input`}
          name={name}
          type={inputType}
          onChange={(event) => setValue(event.currentTarget.value)}
          onBlur={() => setTouched(true)}
          aria-describedby={displayErrorMessage ? `${name}-error` : undefined}
        />
        {isVisiblePassword ? (
          <VisibleEye onClick={onClickVisibleIcon} width="22" height="22" />
        ) : (
          <UnVisibleEye onClick={onClickVisibleIcon} width="22" height="22" />
        )}
      </div>

      {displayErrorMessage ? (
        <span role="alert" id={`${name}-error`} className={PasswordInputCss.errorMessage}>
          {errorMessage}
        </span>
      ) : null}
    </div>
  );
};

export default PasswordInput;
