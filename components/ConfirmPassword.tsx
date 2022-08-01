import React, { useState } from "react";
import usePasswordValue from "hooks/usePasswordValue";
import UnVisibleEye from "public/images/unVisibleEye.svg";
import VisibleEye from "public/images/visibleEye.svg";
import PasswordInputCss from "styles/components/PasswordInputCss.module.scss";

function ConfirmPassword({
  name,
  passwordInputName,
  wasSubmitted,
  className,
}: {
  name: string;
  passwordInputName: string;
  wasSubmitted: boolean;
  className: string;
}) {
  const ref = React.useRef<HTMLInputElement>(null);
  const passwordValue = usePasswordValue(ref, passwordInputName);
  const [value, setValue] = React.useState("");
  const [touched, setTouched] = React.useState(false);
  const [isVisiblePassword, setisVisiblePassword] = useState(false);
  const errorMessage = passwordValue !== value ? "비밀번호가 일치하지 않습니다." : null;
  const displayErrorMessage = (wasSubmitted || touched) && errorMessage;

  const onClickVisibleIcon = (): void => {
    setisVisiblePassword(!isVisiblePassword);
  };

  return (
    <div key={name} className={PasswordInputCss.container + className}>
      <label htmlFor={`${name}-input`}>{name}:</label>
      <br />
      <div className={PasswordInputCss.inputContainer}>
        <input
          ref={ref}
          id={`${name}-input`}
          name={name}
          type="password"
          onChange={(event) => setValue(event.currentTarget.value)}
          onBlur={() => setTouched(true)}
          required
          aria-describedby={displayErrorMessage ? `${name}-error` : undefined}
        />
        {isVisiblePassword ? (
          <VisibleEye onClick={onClickVisibleIcon} width="22" height="22" />
        ) : (
          <UnVisibleEye onClick={onClickVisibleIcon} width="22" height="22" />
        )}
      </div>
      {displayErrorMessage ? (
        <span role="alert" id={`${name}-error`} className="error-message">
          {errorMessage}
        </span>
      ) : null}
    </div>
  );
}

export default ConfirmPassword;
