/** @jsxImportSource @emotion/react */
import { useEffect } from "react";
import styled from "@emotion/styled";
import { css, keyframes } from "@emotion/react";
import Alert from "./common/Alert";
import { toastState } from "states/modal";
import { useRecoilState } from "recoil";
type IProps = {
  children: JSX.Element;
};

const Layout = ({ children }: IProps) => {
  const handleResize = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  const [ToastState] = useRecoilState(toastState);

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
    visibility: ${ToastState.visible ? `visible` : "hidden"};
    animation: ${ToastState.visible ? fadein : fadeout} 0.2s ease-out;
    transition: visibility 0.2s ease-out;
    padding: 21.5px 20px 35px 20px;
    left: 0;
    right: 0;
  `;

  return (
    <LayoutContainer>
      {children}
      <div css={toast}>
        <Alert visible={ToastState.visible} setVisible={ToastState.setVisible} flag={ToastState.toastType} text={ToastState.text} />
      </div>
    </LayoutContainer>
  );
};

const LayoutContainer = styled.div`
  position: relative;
  height: calc(var(--vh) * 100);
  padding: 21.5px 20px 35px 20px;
`;

export default Layout;
