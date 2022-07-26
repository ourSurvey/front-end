import React from "react";
import { Button } from "./Button";
import HeaderName from "./HeaderName";
import Input from "./Input";
import LoginFormCss from "styles/components/LoginForm.module.scss";

const LoginForm = (): JSX.Element => {
  const [wasSubmitted, setwasSubmitted] = React.useState(false);
  return (
    <div className={LoginFormCss.formContainer}>
      <HeaderName name="로그인" hasBack={false} hasNext={false} />
      <form noValidate>
        <Input className="" name="이메일" wasSubmitted={wasSubmitted} type="text" />
        <Input className=" mt30" name="비밀번호" wasSubmitted={wasSubmitted} type="text" />
        <div className="mt30">
          <Button color="#0066d9" btnText="로그인" textColor="#fff" />
        </div>
        <div className={LoginFormCss.center}>
          <span>비밀번호 찾기</span>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
