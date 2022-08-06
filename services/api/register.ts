import { IEmail, IEmailAuth, ISignupData, ILoginData } from "types/auth";
import ApiClient from "services/ApiClient";
import authService from "services/auth.service";
const api = new ApiClient();

//이메일 인증번호 발송
const emailAuth = (email: IEmail) => api.post("/auth/take", email);

//이메일 인증번호 확인
const emailAuthCheckNum = (auth: IEmailAuth) => api.post("/auth/certified", auth);

const register = (userInfo: ISignupData) => authService.signup(userInfo);

const login = (user: ILoginData) => authService.login(user);

export { emailAuth, emailAuthCheckNum, register, login };
