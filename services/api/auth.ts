import { IEmail, IEmailAuth, ISignupData, ILoginData, IResetPwd, IAddtionData } from 'types/auth';
import ApiClient from 'services/ApiClient';
import authService from 'services/auth.service';
import { AxiosResponse } from 'axios';
const api = new ApiClient();
//이메일 인증번호 발송
const emailAuth = (email: IEmail) => api.post('/auth/take', email);
//이메일 인증번호 확인
const emailAuthCheckNum = (auth: IEmailAuth) => api.post('/auth/certified', auth);
//회원가입
const register = (userInfo: ISignupData) => authService.signup(userInfo);
//로그인
const login = (user: ILoginData) => authService.login(user);

//부가정보 보내기
const postAddition = (addition: IAddtionData) => authService.addtion(addition);
//비밀번호 찾기
const findPwd = (email: IEmail) => api.post('/auth/findpwd', email);
//비밀번호 초기화
const resetPassword = (pwdinfo: IResetPwd) => api.post('/auth/resetpwd', pwdinfo);
//인증 여부 확인
const isAuthed = (token: string): Promise<AxiosResponse> => authService.isAuthedUser(token);

const getRefresh = (token: string): Promise<AxiosResponse> => authService.refresh(token);

export { emailAuth, emailAuthCheckNum, register, login, findPwd, resetPassword, isAuthed, getRefresh, postAddition };
