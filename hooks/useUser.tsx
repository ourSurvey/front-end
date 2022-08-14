import { useState, useEffect } from "react";
import { useRequest } from "./useRequest";
import Router from "next/router";
import { isAuthed } from "services/api/auth";

interface IParams {
  redirectTo?: string;
  redirectIfFound?: boolean;
}

const useUser = ({ redirectTo, redirectIfFound }: IParams) => {
  const { data, error } = useRequest("authed", isAuthed);
  const [calledPush, setCalledPush] = useState(false);
  const user = data?.data;
  const hasUser = user;

  useEffect(() => {
    if (!redirectTo) return;
    if ((redirectTo && !redirectIfFound && !hasUser) || (redirectIfFound && hasUser)) {
      let calledPushLatest;
      setCalledPush((latest) => {
        calledPushLatest = latest;
        return latest;
      });
      // react-state는 실제로 "비동기"이고 업데이트를 반영하는 데 약간의 시간이 걸리므로 router.push를 여러 번 다시 호출할 수 있기 때문에 최신 상태를 얻는다.

      if (calledPushLatest) return; // router.push has already been called

      // proceed to redirect
      setCalledPush(true);
      Router.push(redirectTo);
    }
  }, [redirectTo, redirectIfFound, hasUser]);

  return error ? null : user;
};

export default useUser;
