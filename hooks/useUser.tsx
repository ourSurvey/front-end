import { useEffect } from "react";
import { useRequest } from "./useRequest";
import Router from "next/router";
import { isAuthed } from "services/api/auth";

interface IParams {
  redirectTo?: string;
  redirectIfFound?: string;
}

const useUser = ({ redirectTo, redirectIfFound }: IParams) => {
  const { data, error } = useRequest("authed", isAuthed);

  const user = data?.data;
  const hasUser = user;

  useEffect(() => {
    if (!redirectTo) return;
    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !hasUser) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && hasUser)
    ) {
      Router.push(redirectTo);
    }
  }, [redirectTo, redirectIfFound, hasUser]);

  return error ? null : user;
};

export default useUser;
