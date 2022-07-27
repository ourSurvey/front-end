import React from "react";
import PasswordInputCss from "styles/components/PasswordInputCss.module.scss";
import UnVisibleEye from "public/images/unVisibleEye.svg";
import VisibleEye from "public/images/visibleEye.svg";

interface IProps {
  name: string; //폼이 제출되었을 때 form.element에서 필드값을 찾는데 사용
  type: string; //input의 타입 지정
  setValue: (text: string) => void;
  setTouched: (bool: boolean) => void;
  displayErrorMessage: string | boolean | null;
  isVisible: boolean;
  setisVisiblePassword: (flag: boolean) => void;
}

const PasswordInput = (props: IProps) => {
  const { name, type, setValue, setTouched, displayErrorMessage, isVisible, setisVisiblePassword } = props;
  const onClickVisibleIcon = (): void => {
    setisVisiblePassword(!isVisible);
  };
  return (
    <div className={PasswordInputCss.container}>
      <input
        id={`${name}-input`}
        name={name}
        type={type}
        onChange={(event) => setValue(event.currentTarget.value)}
        onBlur={() => setTouched(true)}
        aria-describedby={displayErrorMessage ? `${name}-error` : undefined}
      />
      {isVisible ? (
        <VisibleEye onClick={onClickVisibleIcon} width="22" height="22" />
      ) : (
        <UnVisibleEye onClick={onClickVisibleIcon} width="22" height="22" />
      )}
    </div>
  );
};

export default PasswordInput;
