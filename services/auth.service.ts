import { ILoginData, ISignupData } from "../types/auth";
import ApiClient from "./ApiClient";
import TokenProvider from "./TokenProvider";

type SignupAgreements = {
  /** 만 14세 이상입니다 */
  terms_fourteen: boolean;
  /** 쿠팡 이용약관 동의 */
  terms_service: boolean;
  /** 전자금융거래 이용약관 동의 */
  terms_commerce: boolean;
  /** 개인정보 수집 및 이용 동의 */
  terms_privacy_collect_use: boolean;
  /** 개인정보 제3차 제공 동의 */
  agree_to_collect_third_part_information: boolean;
  /** 광고성 목적의 개인정보 수집 및 이용 동의 */
  agree_to_collect_for_ads: boolean;
  /** 이메일 수신 동의 */
  agree_to_receive_email: boolean;
  /** SMS,MMS 수신 동의 */
  agree_to_receive_sms: boolean;
  /** 앱 푸시 수신 동의 */
  agree_to_receive_push: boolean;
};

class AuthService extends ApiClient {
  /** refreshToken을 이용해 새로운 토큰을 발급받습니다. */
  async refresh() {
    if (!TokenProvider.has("refreshToken")) return;

    const { data } = await super.post("/auth/refresh", null, {
      headers: {
        Authorization: `Bearer ${TokenProvider.get("refreshToken")}`,
      },
    });
    TokenProvider.set("accessToken", data.access, 1);
    TokenProvider.set("refreshToken", data.refresh, 7);
  }

  /** 새로운 계정을 생성하고 토큰을 발급받습니다. */
  async signup(signupData: ISignupData) {
    const { data } = await super.post("/auth/signup", signupData);
    TokenProvider.set("accessToken", data.access, 1);
    TokenProvider.set("refreshToken", data.refresh, 7);
  }

  /** 이미 생성된 계정의 토큰을 발급받습니다. */
  async login(loginData: ILoginData) {
    const { data } = await super.post("/auth/login", loginData);
    TokenProvider.set("accessToken", data.access, 1);
    TokenProvider.set("refreshToken", data.refresh, 7);
  }

  // 아직 요청 url 을 모름
  async logout() {
    const { data } = await super.post("logoutUrl", null);
    TokenProvider.clear();
  }
}

export default new AuthService();
