import React from "react";
import { Button } from "./Button";
import HeaderName from "./HeaderName";
import Input from "./Input";
import LoginFormCss from "styles/components/LoginForm.module.scss";

const LoginForm = (): JSX.Element => {
  const [wasSubmitted, setwasSubmitted] = React.useState(false);
  const [email, setEmail] = React.useState(false);
  const [pwd, setPwd] = React.useState(false);
  const Login = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const fieldValues = Object.fromEntries(formData.entries());
    console.log(fieldValues);
    setwasSubmitted(true);
  };
  const ckBtn = email && pwd;

  return (
    <div className={LoginFormCss.formContainer}>
      <HeaderName name="로그인" hasBack={false} hasNext={false} />

      <form noValidate onSubmit={Login}>
        <Input setValidate={setEmail} className="" name="이메일" wasSubmitted={wasSubmitted} type="email" />
        <Input setValidate={setPwd} className=" mt30" name="비밀번호" wasSubmitted={wasSubmitted} type="password" />

        <div className="mt30">
          <Button isDisabled={!ckBtn} color="#0066d9" btnText="로그인" textColor="#fff" />
        </div>
      </form>
      <div className={LoginFormCss.center}>
        <span>비밀번호 찾기</span>
      </div>
    </div>
  );
};

export default LoginForm;
