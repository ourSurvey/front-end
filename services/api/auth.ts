import { type AxiosResponse } from 'axios';
import ApiClient from 'services/ApiClient';
import authService from 'services/auth.service';
import {
  type IEmail,
  type IEmailAuth,
  type ISignupData,
  type ILoginData,
  type IResetPwd,
  type IAddtionData,
} from 'types/auth';

const api = new ApiClient();
// 이메일 인증번호 발송
const emailAuth = async (email: IEmail) => await api.post('/auth/send-mail', email);
// 이메일 인증번호 확인
const emailAuthCheckNum = async (auth: IEmailAuth) => await api.post('/auth/certified', auth);
// 회원가입
const register = async (userInfo: ISignupData) => await authService.signup(userInfo);
// 로그인
const login = async (user: ILoginData) => await authService.login(user);

// 부가정보 보내기
const postAddition = async (addition: IAddtionData) => await authService.addtion(addition);
// 비밀번호 찾기
const findPwd = async (email: IEmail) => await api.post('/auth/findpwd', email);
// 비밀번호 초기화
const resetPassword = async (pwdinfo: IResetPwd) => await api.post('/auth/resetpwd', pwdinfo);
// 인증 여부 확인
const isAuthed = async (token: string): Promise<AxiosResponse> => await authService.isAuthedUser(token);

const getRefresh = async (token: string): Promise<AxiosResponse> => await authService.refresh(token);

export { emailAuth, emailAuthCheckNum, register, login, findPwd, resetPassword, isAuthed, getRefresh, postAddition };
