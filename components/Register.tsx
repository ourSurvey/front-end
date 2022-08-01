import React, { useState } from "react";
import ConfirmPassword from "./ConfirmPassword";
import HeaderName from "./HeaderName";
import PasswordInput from "./PasswordInput";
import TosContainer from "./register/TosContainer";

const Register = () => {
  const [wasSubmitted, setwasSubmitted] = useState(false);
  const [validatePassword, setvalidatePassword] = useState(false);
  const [buttonNameState, setbuttonNameState] = useState(false);
  return (
    <div>
      <HeaderName name="회원가입" hasBack={true} hasNext={false} />
      <form>
        <div>
          <label htmlFor={`email-input`}>이메일 주소</label>
          <br />
          <input id={`email-input`} type="email" placeholder="abc@gmail.com" />
          <button>{!buttonNameState ? "인증하기" : "재발송"}</button>
        </div>
        <div>
          <PasswordInput className="" name="비밀번호" wasSubmitted={wasSubmitted} setValidate={setvalidatePassword} />
          <ConfirmPassword name="비밀번호 확인" passwordInputName="비밀번호" wasSubmitted={wasSubmitted} className="" />
        </div>
      </form>
      <TosContainer />
    </div>
  );
};

export default Register;
