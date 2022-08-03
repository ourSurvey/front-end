export type SignupAgreements = {
  privacy: boolean;
  ad:
    | {
        email: boolean;
        sms: boolean;
        app: boolean;
      }
    | false;
};

export interface ILoginData {
  email: string;
  password: string;
}

export interface ISignupData {
  email: string;
  pwd: string;
  nickName: string;
}

export interface ICookieData {
  access: string;
  refresh: string;
}

//회원가입
export interface IEmail {
  email: string;
}
export interface IEmailAuth {
  email: string;
  code: string;
}

export interface IRegisterInfo {
  email: string;
  pwd: string;
}
