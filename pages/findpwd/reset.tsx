import { useState } from 'react';
import PasswordInput from 'components/common/PasswordInput';
import { Common, Pretendard } from 'styles/common';
import ConfirmPassword from 'components/common/ConfirmPassword';
import { Button } from 'components/common/Button';
import styled from '@emotion/styled';
import { resetPassword } from 'services/api/auth';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { toastState } from 'states/modal';
import { useRecoilState } from 'recoil';
import SearchHeader from 'components/common/SearchHeader';

const Reset = () => {
  const [wasSubmitted, setwasSubmitted] = useState(false);
  const [isSame, setIsSame] = useState(false);
  const [validatePassword, setvalidatePassword] = useState(false);
  const restButtonToggle = isSame && validatePassword;
  const [ToastState, setToastState] = useRecoilState(toastState);
  const router = useRouter();

  const resetPasswordHandler = useMutation(resetPassword, {
    onSuccess: () => {
      setToastState({
        ...ToastState,
        visible: true,
        text: '비밀번호가 재설정 되었습니다.',
        toastType: 'success',
        marginPosition: 0,
      });
      setTimeout(() => {
        router.push('/login');
      }, 1000);
    },
    onError: () => {
      setToastState({
        ...ToastState,
        visible: true,
        text: '비밀번호 설정에 실패 했습니다.',
        toastType: 'error',
        marginPosition: 0,
      });
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const fieldValues = Object.fromEntries(formData.entries());
    const pwd = fieldValues['비밀번호'] as string;
    setwasSubmitted(true);
    resetPasswordHandler.mutate({ pwd: pwd, token: router.query.token as string });
  };

  return (
    <>
      <SearchHeader name="비밀번호 재설정" hasBack={true} hasSearch={false} />
      <Title>새로운 비밀번호를 입력해주세요.</Title>
      <form onSubmit={onSubmit}>
        <PasswordInput name="비밀번호" wasSubmitted={wasSubmitted} setValidate={setvalidatePassword} />
        <ConfirmPassword
          placeHolder="비밀번호를 한번 더 입력해주세요"
          setIsSame={setIsSame}
          name="비밀번호 확인"
          passwordInputName="비밀번호"
          wasSubmitted={wasSubmitted}
        />
        <Button
          type="submit"
          color={Common.colors.BL500}
          btnText="재설정 하기"
          textColor="#fff"
          isDisabled={!restButtonToggle}
        />
      </form>
    </>
  );
};

export default Reset;

const Title = styled.h1`
  ${Pretendard({ font: 1.8, weight: 700, color: Common.colors.GY900 })}
  margin-bottom:30px;
`;
