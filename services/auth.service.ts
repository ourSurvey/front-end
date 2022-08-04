import { ILoginData, ISignupData } from "../types/auth";
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
    TokenProvider.set("accessToken", data.access, 1);
  }

  /** 이미 생성된 계정의 토큰을 발급받습니다. */
  async login(loginData: ILoginData) {
    const { data } = await super.post("/login", loginData);
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
