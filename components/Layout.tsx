/** @jsxImportSource @emotion/react */
import { useEffect } from "react";
import styled from "@emotion/styled";

import Alert from "./common/Alert";

import { useRouter } from "next/router";
import NavBar from "./common/NavBar";
import { hasNavbar } from "utills/hasNavbar";
import Portal from "./common/Portal";
type IProps = {
  children: JSX.Element;
};

const Layout = ({ children }: IProps) => {
  const handleResize = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  const router = useRouter();

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const LayoutContainer = styled.div`
    position: relative;
    height: calc(var(--vh) * 100);
    padding: 21.5px 20px 35px 20px;
  `;

  return (
    <LayoutContainer>
      {children}
      <Portal selector="#portal">
        <Alert />
      </Portal>
      {hasNavbar(router.asPath) ? <NavBar /> : ""}
    </LayoutContainer>
  );
};

export default Layout;
