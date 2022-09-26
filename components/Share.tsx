import Dimmer from "components/common/Dimmer";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { Pretendard, Common } from "styles/common";

import { memo, useState } from "react";
import ShareBody from "./modal/ShareBody";

interface IProps {
  visibleState: boolean;
  setVisible: (state: boolean) => void;
}
const Share = ({ visibleState, setVisible }: IProps) => {
  const fadein = keyframes`
  from {bottom: -30%; opacity: 0;}
  to {bottom: 0; opacity: 1;}
`;
  const fadeout = keyframes`
  from {bottom: 0; opacity: 1;}
  to {bottom: -30%; opacity: 0;}
`;

  const Modal = styled.div`
    position: absolute;
    padding: 23px 25px;
    display: block;
    animation: ${visibleState ? fadein : fadeout} 0.2s ease-out;
    width: calc(100% + 40px);
    margin: 0 -20px -35px -20px;
    bottom: 0;
    height: 30%;
    border-radius: 30px 30px 0px 0px;
    background-color: #fff;
    z-index: 200;

    & svg {
      position: absolute;
      right: 25px;
    }
    & span {
      display: block;
      ${Pretendard({ font: 1.6, weight: 700, color: Common.colors.GY900 })};
      line-height: 150%;
      text-align: center;
    }
  `;

  return (
    <>
      <Dimmer onClick={() => setVisible(false)} />
      <Modal>
        <ShareBody setVisible={setVisible} />
      </Modal>
    </>
  );
};

export default memo(Share);
