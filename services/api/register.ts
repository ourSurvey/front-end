import { IEmail, IEmailAuth, ISignupData, ILoginData, IResetPwd } from "types/auth";
import ApiClient from "services/ApiClient";
import authService from "services/auth.service";
const api = new ApiClient();
//이메일 인증번호 발송
const emailAuth = (email: IEmail) => api.post("/auth/take", email);
//이메일 인증번호 확인
const emailAuthCheckNum = (auth: IEmailAuth) => api.post("/auth/certified", auth);

const register = (userInfo: ISignupData) => authService.signup(userInfo);

const login = (user: ILoginData) => authService.login(user);

const findPwd = (email: IEmail) => api.post("/auth/findpwd", email);

const resetPassword = (pwdinfo: IResetPwd) => api.post("/auth/resetpwd", pwdinfo);

export { emailAuth, emailAuthCheckNum, register, login, findPwd, resetPassword };
