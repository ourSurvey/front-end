import { emailValidate, pNumValidate, passwordValidate, getFieldError, birthValidate } from "./validate";
describe("정규식", () => {
  describe("이메일 정규식", () => {
    test("이메일 주소 시작은 숫자나 알파벳으로 시작한다.", () => {
      expect(emailValidate("asd231@naverc.com")).toBe(true);
      expect(emailValidate("7sd231@naverc.com")).toBe(true);
      expect(emailValidate("Asd231@naverc.com")).toBe(true);
      expect(emailValidate("!sd231@naverc.com")).toBe(false);
    });

    test("이메일 첫째자리 뒤에는 -,_,.을 포함하여 들어올 수 있다.", () => {
      expect(emailValidate("a_d231@naverc.com")).toBe(true);
      expect(emailValidate("7-d231@naverc.com")).toBe(true);
      expect(emailValidate("A.d231@naverc.com")).toBe(true);
      expect(emailValidate("A!d231@naverc.com")).toBe(false);
    });
    test("도메인 주소 전에는 @가 들어와야 한다", () => {
      expect(emailValidate("asdf1234@naver.com")).toBe(true);
      expect(emailValidate("asdf1234naverc.com")).toBe(false);
    });
    test(".가 최소한 하나는 있어야 하며 마지막 마디는 2-3자리여야 한다", () => {
      expect(emailValidate("asdf1234@naver.com")).toBe(true);
      expect(emailValidate("asdf1234@naverc.co")).toBe(true);
      expect(emailValidate("asdf1234naverc.comm")).toBe(false);
      expect(emailValidate("asdf1234naverccomm")).toBe(false);
    });
  });

  describe("휴대폰 번호 정규식", () => {
    test("휴대폰 번호 첫/두번째 자리는 01로 시작하며 세번째 자리는  0/1/6/7/8/9이어야 한다.", () => {
      expect(pNumValidate("01063059363")).toBe(true);
      expect(pNumValidate("01263059363")).toBe(false);
      expect(pNumValidate("01663059363")).toBe(true);
    });

    test("번호 두번째 마디는 3-4자리가 가능하다.", () => {
      expect(pNumValidate("010-635-9363")).toBe(true);
      expect(pNumValidate("010-60-5363")).toBe(false);
      expect(pNumValidate("016-6305-9363")).toBe(true);
    });
    test("번호 마지막 마디는 4자리만 가능하다", () => {
      expect(pNumValidate("010-635-9363")).toBe(true);
      expect(pNumValidate("010-6032-536")).toBe(false);
      expect(pNumValidate("010-6032-5361")).toBe(true);
      expect(pNumValidate("016-6305-93634")).toBe(false);
    });
  });

  describe("비밀번호 정규식", () => {
    test("비밀번호는 8자리 이상이어야 한다", () => {
      expect(passwordValidate("asdf1234!")).toBe(true);
      expect(passwordValidate("asdf14!")).toBe(false);
      expect(passwordValidate("asdf14!2")).toBe(true);
    });

    test("비밀번호는 하나 이상의 문자가 포함되어야 한다", () => {
      expect(passwordValidate("123424141!")).toBe(false);
      expect(passwordValidate("b23424141!")).toBe(true);
    });
    test("비밀번호는 하나 이상의 특수문자가 포함되어야 한다", () => {
      expect(passwordValidate("asdf1234!")).toBe(true);
      expect(passwordValidate("asdf1412")).toBe(false);
      expect(passwordValidate("tune123@#")).toBe(true);
    });
  });

  describe("출생년도 정규식", () => {
    test("출생년도는 4자리여야한다", () => {
      expect(birthValidate("1996")).toBe(true);
      expect(birthValidate("1997")).toBe(true);
      expect(birthValidate("960718")).toBe(false);
      expect(birthValidate("960")).toBe(false);
    });

    test("출생년도는 앞자리가 19또는20년으로 시작해야한다", () => {
      expect(birthValidate("1996")).toBe(true);
      expect(birthValidate("1997")).toBe(true);
      expect(birthValidate("2002")).toBe(true);
      expect(birthValidate("2000")).toBe(true);
      expect(birthValidate("2120")).toBe(false);
      expect(birthValidate("1819")).toBe(false);
      expect(birthValidate("1719")).toBe(false);
    });
  });

  describe("유효성 검사 함수", () => {
    test('이메일 정규식이 틀렸을 시에 "올바른 이메일을 입력해주세요." 문구가 출력되어야 한다.', () => {
      expect(getFieldError("", "이메일")).toBe("필수 입력 값 입니다!");
      expect(getFieldError("sunpl13naver.com", "이메일")).toBe("올바른 이메일을 입력해주세요.");
      expect(getFieldError("sunpl13@naver.com", "이메일")).toBe(null);
    });

    test("비밀번호가 틀렸을 시", () => {
      expect(getFieldError("", "비밀번호")).toBe("필수 입력 값 입니다!");
      expect(getFieldError("0102341", "비밀번호")).toBe("비밀번호는 최소 8자, 하나 이상의 문자, 숫자 및 특수문자 입니다.");
      expect(getFieldError("asdf1234", "비밀번호")).toBe("비밀번호는 최소 8자, 하나 이상의 문자, 숫자 및 특수문자 입니다.");
      expect(getFieldError("asdf1234+", "비밀번호")).toBe(null);
    });
  });
});
