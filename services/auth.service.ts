import { ILoginData, ISignupData, IAddtionData } from "../types/auth";
import ApiClient from "./ApiClient";
import TokenProvider from "./TokenProvider";

class AuthService extends ApiClient {
  /** refreshToken을 이용해 새로운 토큰을 발급받습니다. */
  async refresh() {
    if (!TokenProvider.has("refreshToken")) return;

    const { data } = await super.post("/refresh", null, {
      headers: {
        Authorization: `Bearer ${TokenProvider.get("refreshToken")}`,
      },
    });
    TokenProvider.set("accessToken", data.access, 1);
    TokenProvider.set("refreshToken", data.refresh, 7);
  }

  /** 새로운 계정을 생성하고 토큰을 발급받습니다. */
  async signup(signupData: ISignupData) {
    const { data } = await super.post("/auth/join", signupData);
    TokenProvider.set("accessToken", data.data.access, 1);

    return data;
  }

  /** 이미 생성된 계정의 토큰을 발급받습니다. */
  async login(loginData: ILoginData) {
    const { data } = await super.post("/auth/login", loginData);

    const refreshExpire: number = data.data.refreshExpire / 60 / 60 / 24; //초로 오는 시간 일로 변환

    TokenProvider.set("accessToken", data.data.access, 1);
    TokenProvider.set("refreshToken", data.data.refresh, refreshExpire);
  }

  async isAuthedUser() {
    const { data } = await super.get("/auth/validate", {
      headers: {
        Authorization: `Bearer ${TokenProvider.get("accessToken")}`,
      },
    });

    return data;
  }

  async addtion(additionData: IAddtionData) {
    const { data } = await super.post("/auth/addition", additionData, {
      headers: {
        Authorization: `Bearer ${TokenProvider.get("accessToken")}`,
      },
    });

    return data;
  }

  // 아직 요청 url 을 모름
  async logout() {
    const { data } = await super.post("logoutUrl", null);
    TokenProvider.clear();
  }
}

export default new AuthService();
