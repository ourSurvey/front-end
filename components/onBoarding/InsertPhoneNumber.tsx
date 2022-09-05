import styled from "@emotion/styled";
import { Button } from "components/common/Button";
import { getFieldError } from "utills/validate";
import { Common, Pretendard } from "styles/common";
import React, { useState, useEffect } from "react";
import { stepState } from "states/stepProgress";
import { addtionState } from "states/onBoard";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useRouter } from "next/router";

const InsertPhoneNumber = (props: any) => {
  const [pNum, setPNum] = useState("");
  const [touched, setTouched] = useState(false);
  const errorMessage = getFieldError(pNum, "휴대폰 번호");
  const displayErrorMessage = touched && errorMessage;
  const setStepState = useSetRecoilState(stepState);
  const [additionState, setAdditionState] = useRecoilState(addtionState);
  const router = useRouter();

  const nextPage = (): void => {
    setAdditionState({
      ...additionState,
      tel: pNum,
    });
    router.push("/onBoarding/start");
  };

  const noAnswerNextPage = (): void => {
    setAdditionState({
      ...additionState,
      tel: null,
    });
    router.push("/onBoarding/start");
  };

  useEffect(() => {
    setStepState(3);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>연락처를 선택해주세요.</h1>
      <Description>빠른 설문조사를 위해 인구통계적 정보를 수집하고 있어요!</Description>
      <Container isError={displayErrorMessage}>
        <input
          name="pNum"
          type="number"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPNum(event.currentTarget.value)}
          onBlur={() => setTouched(true)}
          aria-describedby={displayErrorMessage ? `pNum-error` : undefined}
          placeholder="하이픈('-') 없이 숫자만 입력해주세요."
        />

        {displayErrorMessage ? (
          <ErrorMessage role="alert" id={`pNum-error`}>
            {errorMessage}
          </ErrorMessage>
        ) : null}
      </Container>
      <Button onClick={nextPage} isDisabled={errorMessage !== null || pNum === ""} btnText="다음" color={Common.colors.BL500} textColor="#fff" />
      <Pstyle onClick={noAnswerNextPage}>답변하지 않고 넘어가기</Pstyle>
    </div>
  );
};

export default InsertPhoneNumber;

const Container = styled.div<{ isError: string | boolean | null }>`
  margin-bottom: 30px;
  & input {
    padding: 10px 15px;
    border: 1px solid ${(props) => (props.isError ? Common.colors.alert500 : Common.colors.GY300)};
    border-radius: 10px;
    height: 46px;
    width: 100%;
  }
  & input::placeholder {
    ${Pretendard({ font: 1.4, weight: 400, color: Common.colors.GY500 })}
  }
  & label {
    ${Pretendard({ font: 1.2, weight: 700, color: Common.colors.GY700 })}
  }
`;

const Pstyle = styled.p`
  ${Pretendard({ font: 1.3, weight: 400, color: Common.colors.GY700 })}
  margin-top: 22px;
  margin-bottom: 28px;
  text-align: center;
`;
const Description = styled.p`
  margin-top: 9px;
  ${Pretendard({ font: 1.2, weight: 400, color: Common.colors.GY900 })}
  margin-bottom:30px;
`;

const ErrorMessage = styled.span`
  ${Pretendard({ font: 1.2, weight: 400, color: Common.colors.alert500 })}
`;
