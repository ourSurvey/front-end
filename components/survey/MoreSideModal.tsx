import Dimmer from "components/common/Dimmer";
import React from "react";
import MoreSelectionModal from "./MoreSelectionModal";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { Pretendard, Common } from "styles/common";

interface IProps {
  visibleState: boolean;
  setVisible: (state: boolean) => void;
}

const MoreSideModal = ({ visibleState, setVisible }: IProps) => {
  console.log(visibleState);

  const fadein = keyframes`
  from {right: -40%; opacity: 0;}
  to {right: 0; opacity: 1;}
`;
  const fadeout = keyframes`
  from {right: 0; opacity: 1;}
  to {right: -40%; opacity: 0;}
`;

  const Modal = styled.div`
    position: absolute;
    padding-top: 20px;
    display: block;
    animation: ${visibleState ? fadein : fadeout} 0.2s ease-out;
    height: calc(100% + 46.5px);
    margin: -21.5px 0 -35px 0;
    bottom: 0;
    right: 0;
    width: 50%;

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
      letter-spacing: -0.03em;
    }
  `;

  return (
    <>
      <Dimmer
        onClick={() => {
          setVisible(!visibleState);
        }}
      />
      <Modal>
        <MoreSelectionModal />
      </Modal>
    </>
  );
};

export default MoreSideModal;
