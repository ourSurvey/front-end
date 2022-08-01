import { useEffect } from "react";
import styled from "@emotion/styled";

type IProps = {
  children: JSX.Element;
};

const Layout = ({ children }: IProps) => {
  const handleResize = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <LayoutContainer>{children}</LayoutContainer>;
};

const LayoutContainer = styled.div`
  height: calc(var(--vh) * 100);
  padding: 21.5px 20px 35px 20px;
`;

export default Layout;
