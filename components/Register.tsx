import { useState } from "react";
import ConfirmPassword from "./common/ConfirmPassword";
import HeaderName from "./HeaderName";
import PasswordInput from "./common/PasswordInput";
import TosContainer from "./register/TosContainer";
import styled from "@emotion/styled";
import { Common, Pretendard } from "styles/common";
import { getFieldError } from "utills/validate";
import { Button } from "./common/Button";
const Register = () => {
  const [wasSubmitted, setwasSubmitted] = useState(false);
  const [validatePassword, setvalidatePassword] = useState(false);
  const [touched, setTouched] = useState(false);
  const [buttonNameState, setbuttonNameState] = useState(false);
  const [emil, setemil] = useState("");
  const errorMessage = getFieldError(emil, "이메일");
  const [isAllCheck, setisAllCheck] = useState(false);
  const displayErrorMessage = (wasSubmitted || touched) && errorMessage;

  const registerOnButton = isAllCheck;

  return (
    <div>
      <HeaderName name="회원가입" hasBack={true} hasNext={false} />
      <form>
        <Label htmlFor={`email-input`}>이메일 주소</Label>
        <br />
        <div style={{ marginBottom: "30px" }}>
          <EmailContainer>
            <input
              id={`email-input`}
              onChange={(e) => setemil(e.currentTarget.value)}
              onBlur={() => setTouched(true)}
              type="email"
              placeholder="abc@gmail.com"
            />
            <button disabled={errorMessage !== null}>{!buttonNameState ? "인증하기" : "재발송"}</button>
          </EmailContainer>
          {displayErrorMessage ? (
            <ErrorMessage role="alert" id={`${name}-error`}>
              {errorMessage}
            </ErrorMessage>
          ) : null}
        </div>
        <div>
          <PasswordInput className="" name="비밀번호" wasSubmitted={wasSubmitted} setValidate={setvalidatePassword} />
          <ConfirmPassword name="비밀번호 확인" passwordInputName="비밀번호" wasSubmitted={wasSubmitted} className="" />
        </div>
      </form>
      <TosContainer setIsAllCheck={setisAllCheck} />
      <Button color={Common.colors.BL500} btnText="가입하기" textColor="#fff" isDisabled={registerOnButton} />
    </div>
  );
};
const EmailContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
  & input {
    padding: 14.5px 15px;
    border: 1px solid ${Common.colors.GY700};
    border-radius: 10px;
    height: 46px;
    width: 70%;
  }
  & button {
    width: calc(30% - 10px);
    height: 46px;
    border: 2px solid ${Common.colors.GY700};
    border-radius: 10px;
    padding: 10px 15px;
    background-color: #fff;
    outline: 0;
    ${Pretendard({ font: 1.3, weight: 700, color: Common.colors.GY900 })}
    line-height: 16px;
  }
  & button:disabled {
    opacity: 0.35;
  }
`;
const Label = styled.label`
  ${Pretendard({ font: 1.2, weight: 700, color: Common.colors.GY700 })}
`;

const ErrorMessage = styled.span`
  ${Pretendard({ font: 1.2, weight: 400, color: Common.colors.alert500 })}
  margin-bottom: 30px;
`;

export default Register;
