import React, { useState, useEffect } from "react";
import { Button } from "components/common/Button";
import HeaderName from "components/HeaderName";
import Input from "components/common/Input";
import PasswordInput from "components/common/PasswordInput";
import OutLineButton from "components/common/OutLineButton";
import styled from "@emotion/styled";
import { Common, Pretendard } from "styles/common";

const Index = () => {
  const [wasSubmitted, setwasSubmitted] = useState(false);
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
    <FormContainer>
      <div>
        <HeaderName name="로그인" hasBack={false} hasNext={false} />

        <form noValidate onSubmit={Login}>
          <Input setValidate={setEmail} name="이메일" wasSubmitted={wasSubmitted} type="email" />
          <PasswordInput name="비밀번호" className=" mt30" wasSubmitted={wasSubmitted} setValidate={setPwd} />

          <div className="mt30">
            <Button isDisabled={!ckBtn} color="#0066d9" btnText="로그인" textColor="#fff" />
          </div>
        </form>
        <Center>
          <span>비밀번호 찾기</span>
        </Center>
      </div>
      <OutLineButton isDisabled={false} borderColor="#0066d9" btnText="회원가입" textColor="#363841" />
    </FormContainer>
  );
};

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 5px;
  height: 100%;
`;
const Center = styled.div`
  text-align: center;
  margin-top: 16px;
  & span {
    ${Pretendard({ font: 1.2, weight: 400, color: Common.colors.GY700 })}
  }
`;

export default Index;
