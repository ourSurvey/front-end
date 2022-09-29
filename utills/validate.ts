//이메일 정규식
const emailValidate = (text: string): boolean => {
  const email: RegExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

  if (email.test(text)) {
    return true;
  } else {
    return false;
  }
};

//폰번호 정규식
const pNumValidate = (phoneNumber: string): boolean => {
  const regPhone: RegExp = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
  if (regPhone.test(phoneNumber)) {
    return true;
  } else {
    return false;
  }
};

//비밀번호 정규식
const passwordValidate = (password: string): boolean => {
  const regPassword: RegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
  if (regPassword.test(password)) {
    return true;
  } else {
    return false;
  }
};

const birthValidate = (bithYear: string): boolean => {
  const regBirthYear: RegExp = /^(19[0-9][0-9]|20\d{2})$/;
  if (regBirthYear.test(bithYear)) {
    return true;
  } else {
    return false;
  }
};

//터치 호버 풀었을 때 유효성검사 메시지 출력
function getFieldError(value: string | undefined, name: string) {
  if (!value && name === '휴대폰 번호') return '';
  if (!value && name === '출생년도') return '';
  if (!value) return '필수 입력 값 입니다!';
  let check: boolean = false;
  switch (name) {
    case '이메일':
      check = emailValidate(value);
      if (!check) return '올바른 이메일을 입력해주세요.';
      break;
    case '비밀번호':
      check = passwordValidate(value);
      if (!check) return '비밀번호는 최소 8자, 하나 이상의 문자, 숫자 및 특수문자 입니다.';
      break;
    case '휴대폰 번호':
      check = pNumValidate(value);
      if (isNaN(Number(value))) return '숫자만 입력해주세요';
      if (!check) return '올바른 휴대폰 번호를 입력해주세요';
      break;
    case '출생년도':
      check = birthValidate(value);

      if (isNaN(Number(value))) return '숫자만 입력해주세요';
      if (!check) return '올바른 출생년도를 입력해주세요';
      break;
    default:
      return null;
  }
  return null;
}

export { emailValidate, pNumValidate, passwordValidate, getFieldError, birthValidate };
