import React, { useState } from "react";
import usePasswordValue from "hooks/usePasswordValue";
import UnVisibleEye from "public/images/unVisibleEye.svg";
import VisibleEye from "public/images/visibleEye.svg";
import { Common, Pretendard } from "styles/common";
import styled from "@emotion/styled";

function ConfirmPassword({
  name,
  passwordInputName,
  wasSubmitted,
  className,
}: {
  name: string;
  passwordInputName: string;
  wasSubmitted: boolean;
  className: string;
}) {
  const ref = React.useRef<HTMLInputElement>(null);
  const passwordValue = usePasswordValue(ref, passwordInputName);
  const [value, setValue] = React.useState("");
  const [touched, setTouched] = React.useState(false);
  const [isVisiblePassword, setisVisiblePassword] = useState(false);
  const errorMessage = passwordValue !== value ? "비밀번호가 일치하지 않습니다." : null;
  const displayErrorMessage = (wasSubmitted || touched) && errorMessage;

  const onClickVisibleIcon = (): void => {
    setisVisiblePassword(!isVisiblePassword);
  };

  return (
    <Container key={name}>
      <label htmlFor={`${name}-input`}>{name}:</label>
      <br />
      <InputContainer>
        <input
          ref={ref}
          id={`${name}-input`}
          name={name}
          type="password"
          onChange={(event) => setValue(event.currentTarget.value)}
          onBlur={() => setTouched(true)}
          required
          aria-describedby={displayErrorMessage ? `${name}-error` : undefined}
        />
        {isVisiblePassword ? (
          <VisibleEye onClick={onClickVisibleIcon} width="22" height="22" />
        ) : (
          <UnVisibleEye onClick={onClickVisibleIcon} width="22" height="22" />
        )}
      </InputContainer>
      {displayErrorMessage ? (
        <Span role="alert" id={`${name}-error`} className="error-message">
          {errorMessage}
        </Span>
      ) : null}
    </Container>
  );
}

const Span = styled.span`
  ${Pretendard({ font: 1.2, weight: 400, color: Common.colors.alert500 })}
`;

const Container = styled.div`
  & .inputContainer {
    position: relative;
    & svg {
      position: absolute;
      right: 15px;
      top: 12px;
    }
  }

  & input {
    padding: 14.5px 15px;
    border: 1px solid ${Common.colors.GY700};
    border-radius: 10px;
    height: 46px;
    width: 100%;
  }
  & label {
    ${Pretendard({ font: 1.2, weight: 700, color: Common.colors.GY700 })}
  }
`;
const InputContainer = styled.div`
  position: relative;
  & svg {
    position: absolute;
    right: 15px;
    top: 12px;
  }
`;

export default ConfirmPassword;
