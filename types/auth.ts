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

export interface ISignupData extends ILoginData {
  name: string;
  phoneNumber: string;
  agreements: SignupAgreements;
}

export interface ICookieData {
  access: string;
  refresh: string;
}
