import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import HeaderName from "./HeaderName";
import Input from "./Input";
import LoginFormCss from "styles/components/LoginForm.module.scss";
import PasswordInput from "./PasswordInput";
import OutLineButton from "./OutLineButton";

const LoginForm = (): JSX.Element => {
  const [wasSubmitted, setwasSubmitted] = useState(false);
  const [isVisiblePassword, setisVisiblePassword] = useState(false);
  const [inputType, setinputType] = useState("text"); //패스워드 버튼 눌렀을 때 변경 토글
  const [email, setEmail] = useState(false);
  const [pwd, setPwd] = useState(false);

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
      <div>
        <HeaderName name="로그인" hasBack={false} hasNext={false} />

        <form noValidate onSubmit={Login}>
          <Input setValidate={setEmail} className="" name="이메일" wasSubmitted={wasSubmitted} type="email" />
          <PasswordInput name="비밀번호" className=" mt30" wasSubmitted={wasSubmitted} setValidate={setPwd} />

          <div className="mt30">
            <Button isDisabled={!ckBtn} color="#0066d9" btnText="로그인" textColor="#fff" />
          </div>
        </form>
        <div className={LoginFormCss.center}>
          <span>비밀번호 찾기</span>
        </div>
      </div>
      <OutLineButton isDisabled={false} borderColor="#0066d9" btnText="회원가입" textColor="#363841" />
    </div>
  );
};

export default LoginForm;
