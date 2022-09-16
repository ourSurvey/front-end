import Dimmer from "components/common/Dimmer";
import React, { useRef, useEffect, useState } from "react";
import MoreSelectionModal from "./MoreSelectionModal";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

interface IProps {
  visibleState: boolean;
  setVisible: (state: boolean) => void;
}

const MoreSideModal = ({ visibleState, setVisible }: IProps) => {
  const [modalShow, setModalShow] = useState(visibleState);
  let touchMoveStartLocation: number;
  const refs = useRef<any>(null); //모달의 width 크기를 잡기 위한 ref

  const moveEndHandler = (e: React.TouchEvent<HTMLDivElement>) => {
    //이벤트 종료시 슬라이드 한 거리가 모달의 20%가 넘어가면 모달 종료
    if (e.changedTouches[0].clientX - touchMoveStartLocation >= refs.current.clientWidth * 0.2) {
      setModalShow(false);
    }
  };

  const moveStartHandler = (e: React.TouchEvent<HTMLDivElement>) => {
    touchMoveStartLocation = e.targetTouches[0].clientX; //터치 시작 width 잡기
  };

  useEffect(() => {
    if (!modalShow) {
      setTimeout(() => {
        setVisible(false);
      }, 130);
    }
  }, [modalShow]);

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
    animation: ${modalShow ? fadein : fadeout} 0.2s ease-out;
    height: calc(100% + 46.5px);
    margin: -21.5px 0 -35px 0;
    bottom: 0;
    right: 0;
    width: 50%;
    box-shadow: 0px 2px 11px rgba(0, 0, 0, 0.25);

    background-color: #fff;
    z-index: 200;
  `;

  return (
    <>
      <Dimmer
        onClick={() => {
          setModalShow(false);
        }}
      />
      <Modal ref={refs} onTouchStart={moveStartHandler} onTouchEnd={moveEndHandler}>
        <MoreSelectionModal setSideModal={setModalShow} />
      </Modal>
    </>
  );
};

export default MoreSideModal;
