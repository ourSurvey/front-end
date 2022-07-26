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
  const regPassword: RegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  if (regPassword.test(password)) {
    return true;
  } else {
    return false;
  }
};

export { emailValidate, pNumValidate, passwordValidate };
