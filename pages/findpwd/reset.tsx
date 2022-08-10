import { useState } from "react";
import HeaderName from "components/HeaderName";
import PasswordInput from "components/common/PasswordInput";
import { Common, Pretendard } from "styles/common";
import ConfirmPassword from "components/common/ConfirmPassword";
import { Button } from "components/common/Button";
import styled from "@emotion/styled";

const Reset = () => {
  const [wasSubmitted, setwasSubmitted] = useState(false);
  const [isSame, setIsSame] = useState(false);
  const [validatePassword, setvalidatePassword] = useState(false);
  const restButtonToggle = isSame && validatePassword;

  return (
    <div>
      <HeaderName name="비밀번호 재설정" hasBack={true} hasNext={false} />
      <Title>새로운 비밀번호를 입력해주세요.</Title>
      <form>
        <PasswordInput name="비밀번호" wasSubmitted={wasSubmitted} setValidate={setvalidatePassword} />
        <ConfirmPassword
          placeHolder="비밀번호를 한번 더 입력해주세요"
          setIsSame={setIsSame}
          name="비밀번호 확인"
          passwordInputName="비밀번호"
          wasSubmitted={wasSubmitted}
        />
        <Button type="submit" color={Common.colors.BL500} btnText="재설정 하기" textColor="#fff" isDisabled={!restButtonToggle} />
      </form>
    </div>
  );
};

export default Reset;

const Title = styled.h1`
  ${Pretendard({ font: 1.8, weight: 700, color: Common.colors.GY900 })}
  margin-bottom:30px;
`;
