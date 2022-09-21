import { isAuthed, getRefresh } from "services/api/auth";
import cookie from "cookie";
export const withAuth = (GetServerSidePropsFunction: any) => {
  return async (ctx: any) => {
    // 1. 쿠키에 토큰이 있는지 확인
    const accessToken = ctx.req.cookies?.accessToken || null;
    const refreshToken = ctx.req.cookies?.refreshToken || null;

    //둘 다 없다면 login 페이지로 이동시키기
    if (!accessToken && !refreshToken) {
      return {
        redirect: {
          destination: "/login",
          statusCode: 302,
        },
      };
    }

    // 2. HTTP GET 요청을 수행하여 사용자가 인증된 사용자인지 확인
    const data: any = await isAuthed(accessToken);

    //토큰이 만료되었다면
    if (data.code === 480) {
      //리프레시 토큰으로 재인증
      const refreshData: any = await getRefresh(refreshToken);

      if (refreshData.code === 200) {
        //access 토큰 다시 저장
        ctx.res.setHeader("set-cookie", [cookie.serialize("accessToken", refreshData.data.access, { maxAge: 60 * 60 * 24 })]);
        return await GetServerSidePropsFunction(ctx);
      }
    }

    // 3. 사용자가 없거나 사용자가 인증되지 않은 경우 로그인 페이지로 리디렉션
    if (!data.data) {
      return {
        redirect: {
          destination: "/login",
          statusCode: 302,
        },
      };
    }

    // 4. 일반적인 'GetServerSideProps' 기능을 반환
    return await GetServerSidePropsFunction(ctx);
  };
};
