import React, { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "components/common/Button";
import Input from "components/common/Input";
import PasswordInput from "components/common/PasswordInput";
import OutLineButton from "components/common/OutLineButton";
import styled from "@emotion/styled";
import { useMutation } from "react-query";
import { Common, Pretendard, SpaceBetween } from "styles/common";
import { login } from "services/api/auth";
import Link from "next/link";
import { toastState } from "states/modal";
import { useRecoilState } from "recoil";
import SearchHeader from "components/common/SearchHeader";
const Index = () => {
  const router = useRouter();
  const [wasSubmitted, setwasSubmitted] = useState(false);
  const [email, setEmail] = useState(false);
  const [pwd, setPwd] = useState(false);
  const [ToastState, setToastState] = useRecoilState(toastState);

  const loginHandler = useMutation(login, {
    onSuccess: () => {
      //성공 시
      setToastState({
        ...ToastState,
        visible: true,
        text: "로그인에 성공했습니다!",
        toastType: "success",
      });
      setTimeout(() => {
        router.push("/");
      }, 1000);
    },
    onError: () => {
      //실패 시
    },
  });

  const Login = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const fieldValues = Object.fromEntries(formData.entries());
    const loginEmail = fieldValues["이메일"] as string;
    const pwd = fieldValues["비밀번호"] as string;
    loginHandler.mutate({ email: loginEmail, pwd: pwd });
    setwasSubmitted(true);
  };
  const ckBtn = email && pwd;

  // if (user === undefined) {
  //   return <div>Loading...</div>;
  // }

  return (
    <FormContainer>
      <div>
        <SearchHeader name="로그인" hasBack={false} hasSearch={false} />
        <form noValidate onSubmit={Login}>
          <Input setValidate={setEmail} name="이메일" placeHolder="abc@email.com" wasSubmitted={wasSubmitted} type="email" />
          <PasswordInput name="비밀번호" placeHolder="8자 이상의 영문+특수문자" wasSubmitted={wasSubmitted} setValidate={setPwd} />

          <div className="mt30">
            <Button isDisabled={!ckBtn} color="#0066d9" btnText="로그인" textColor="#fff" />
          </div>
        </form>
        <Center>
          <Link href="/findpwd">
            <span>비밀번호 찾기</span>
          </Link>
        </Center>
      </div>

      <OutLineButton isDisabled={false} borderColor="#0066d9" btnText="회원가입" textColor="#363841" onClick={() => router.push("/register")} />
    </FormContainer>
  );
};

const FormContainer = styled.div`
  ${SpaceBetween()}
  flex-direction: column;

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
