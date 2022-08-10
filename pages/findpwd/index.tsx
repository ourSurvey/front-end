import React, { useState } from "react";
import { useMutation } from "react-query";
import HeaderName from "components/HeaderName";
import styled from "@emotion/styled";
import { Common, Pretendard } from "styles/common";
import { getFieldError } from "utills/validate";
import Timmer from "components/common/Timmer";
import GreenCheck from "public/images/greenCheck.svg";
import { emailAuthCheckNum, findPwd } from "services/api/register";
import { useRouter } from "next/router";

const Index = () => {
  const [wasSubmitted, setwasSubmitted] = useState(false);
  const [touched, setTouched] = useState(false); //터치에 대한 state
  const [buttonNameState, setbuttonNameState] = useState(false); //이메일 인증 메일 보내고 난 후 버튼 이름 변경 state
  const [authNumber, setAuthNumber] = useState("");
  const [visibleAuthInput, setVisibleAuthInput] = useState(false); //이메일 인증 보내지면 인증번호 입력할 input 컴포넌트 토글
  const [isAuthedEmail, setIsAuthedEmail] = useState(false); //정상적으로 인증 완료되면 인증완료 표시 나오게 하기
  const [timerMinute, setTimerMinute] = useState(0); //타이머 컴포넌트를 위한 state
  const [email, setemail] = useState("");
  const errorMessage = getFieldError(email, "이메일"); //에러 메시지
  const displayErrorMessage = (wasSubmitted || touched) && errorMessage;
  const [isSame, setIsSame] = useState(false);
  const router = useRouter();
  const registerOnButton = isSame && isAuthedEmail; //버튼 활성화 토글

  const postEmailAuth = useMutation(findPwd, {
    onSuccess: () => {
      setVisibleAuthInput(true);
      setbuttonNameState(true);
      setTimerMinute(3);
    },
    onError: (data) => {
      console.log(data);
    },
  });
  const emailAuthCheck = useMutation(emailAuthCheckNum, {
    onSuccess: () => {
      setVisibleAuthInput(false);
      setIsAuthedEmail(true);
    },
    onError: (data) => {
      alert("인증번호를 다시 확인해주세요");
      console.log(data);
    },
  });

  const emailAuthHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    postEmailAuth.mutate({ email });
  };

  const checkAuth = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    emailAuthCheck.mutate({ email: email, code: authNumber });
  };

  return (
    <div>
      <HeaderName name="비밀번호 찾기" hasBack={true} hasNext={false} />
      <Title>가입한 이메일 주소를 입력해주세요.</Title>
      <form>
        <Label htmlFor={`email-input`}>이메일 주소</Label>
        <br />
        <div style={{ marginBottom: "30px" }}>
          <EmailContainer>
            <input
              id={`email-input`}
              onChange={(e) => setemail(e.currentTarget.value)}
              onBlur={() => setTouched(true)}
              type="email"
              placeholder="abc@gmail.com"
              disabled={isAuthedEmail}
            />
            {/* 이메일 인증 완료 표시 */}
            {!isAuthedEmail ? (
              <AuthButton type="button" onClick={(e) => emailAuthHandler(e)} disabled={errorMessage !== null}>
                {!buttonNameState ? "인증하기" : "재발송"}
              </AuthButton>
            ) : (
              <CompletedAuth>
                <GreenCheck width="14" height="14" /> 인증완료
              </CompletedAuth>
            )}
          </EmailContainer>
          {displayErrorMessage ? (
            <ErrorMessage role="alert" id={`auth-error`}>
              {errorMessage}
            </ErrorMessage>
          ) : null}
        </div>
        {/* visibleAuthInput가 true일 때만 이메일 인증 보여주기 */}
        {visibleAuthInput ? (
          <>
            <Label htmlFor={`auth-input`}>이메일 인증</Label>
            <br />
            <div style={{ marginBottom: "30px" }}>
              <EmailContainer>
                <input id={`auth-input`} onChange={(e) => setAuthNumber(e.currentTarget.value)} onBlur={() => setTouched(true)} type="number" />
                <Timmer minute={timerMinute} second={0} />
                <AuthCheckButton type="button" onClick={(e) => checkAuth(e)} disabled={errorMessage !== null}>
                  인증확인
                </AuthCheckButton>
              </EmailContainer>
            </div>
          </>
        ) : (
          ""
        )}
      </form>
    </div>
  );
};

export default Index;

const CompletedAuth = styled.div`
  width: calc(30% - 10px);
  display: flex;
  align-items: center;
  justify-content: center;
  ${Pretendard({ font: 1.3, weight: 700, color: Common.colors.GR500 })}
  line-height:0;

  & svg {
    margin-right: 2px;
  }
`;

const Title = styled.h1`
  ${Pretendard({ font: 1.8, weight: 700, color: Common.colors.GY900 })}
  margin-bottom:30px;
`;

const EmailContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
  position: relative;
  & input {
    padding: 14.5px 15px;
    border: 1px solid ${Common.colors.GY700};
    border-radius: 10px;
    height: 46px;
    width: 70%;
  }
  & input:disabled {
    padding: 14.5px 15px;
    border-radius: 10px;
    background-color: ${Common.colors.GY50};
    border: none;
  }
  & span {
    position: absolute;
    top: 8px;
    right: calc(30% + 16px);
    ${Pretendard({ font: 1.2, weight: 400, color: Common.colors.alert500 })}
  }
`;
const Label = styled.label`
  ${Pretendard({ font: 1.2, weight: 700, color: Common.colors.GY700 })}
`;

const ErrorMessage = styled.span`
  ${Pretendard({ font: 1.2, weight: 400, color: Common.colors.alert500 })}
  margin-bottom: 30px;
`;

const AuthCheckButton = styled.button`
  width: calc(30% - 10px);
  height: 46px;
  border: 0;
  border-radius: 10px;
  padding: 10px 15px;
  background-color: ${Common.colors.GY900};
  outline: 0;
  ${Pretendard({ font: 1.3, weight: 700, color: "#fff" })}
  line-height: 16px;
`;

const AuthButton = styled.button`
  width: calc(30% - 10px);
  height: 46px;
  border: 2px solid ${Common.colors.GY700};
  border-radius: 10px;
  padding: 10px 15px;
  background-color: #fff;
  outline: 0;
  ${Pretendard({ font: 1.3, weight: 700, color: Common.colors.GY900 })}
  line-height: 16px;

  &:disabled {
    opacity: 0.35;
  }
`;