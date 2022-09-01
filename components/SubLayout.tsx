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
import Portal from "./common/Portal";
type IProps = {
  children: JSX.Element;
};

const SubLayout = ({ children }: IProps) => {
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

  const SubLayoutContainer = styled.div`
    position: relative;
    height: calc(var(--vh) * 100);
    padding: 0;
  `;

  return (
    <SubLayoutContainer>
      {children}
      <Portal selector="#portal">
        <div css={toast} role="alert">
          <Alert />
        </div>
      </Portal>
      {hasNavbar(router.asPath) ? <NavBar /> : ""}
    </SubLayoutContainer>
  );
};

export default SubLayout;