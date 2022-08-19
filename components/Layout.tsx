/** @jsxImportSource @emotion/react */
import { useEffect } from "react";
import styled from "@emotion/styled";
import { css, keyframes } from "@emotion/react";
import Alert from "./common/Alert";
import { showToastState } from "states/modal";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/router";
import NavBar from "./common/NavBar";
import { hasNavbar } from "utills/hasNavbar";
type IProps = {
  children: JSX.Element;
};

const Layout = ({ children }: IProps) => {
  const handleResize = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  const visible = useRecoilValue(showToastState);
  const router = useRouter();

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fadein = keyframes`
  from {bottom: -35px; opacity: 0;}
  to {bottom: 0; opacity: 1;}
`;
  const fadeout = keyframes`
  from {bottom: 0; opacity: 1;}
  to {bottom: -35px; opacity: 0;}
`;
  const toast = css`
    position: absolute;
    bottom: 0;
    visibility: ${visible ? `visible` : "hidden"};
    animation: ${visible ? fadein : fadeout} 0.2s ease-out;
    transition: visibility 0.2s ease-out;
    margin-bottom: ${hasNavbar(router.asPath) ? "27px" : ""}; //nav바가 있다면 알럿 위치 위로 올림
    padding: 21.5px 20px 35px 20px;
    left: 0;
    right: 0;
    z-index: 300;
  `;

  return (
    <LayoutContainer>
      {children}
      <div css={toast} role="alert">
        <Alert />
      </div>
      {hasNavbar(router.asPath) ? <NavBar /> : ""}
    </LayoutContainer>
  );
};

const LayoutContainer = styled.div`
  position: relative;
  height: calc(var(--vh) * 100);
  padding: 21.5px 20px 35px 20px;
`;

export default Layout;
