import Dimmer from "components/common/Dimmer";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { Pretendard, Common } from "styles/common";
import PartDeleteBody from "components/modal/PartDeleteBody";

interface IProps {
  visibleState: boolean;
  setVisible: (state: boolean) => void;
}

const DeleteConfirm = ({ visibleState, setVisible }: IProps) => {
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
    width: 100%;
    bottom: 0;
    height: 25%;
    border-radius: 30px 30px 0px 0px;
    background-color: #fff;
    z-index: 202;

    & span {
      display: block;
      ${Pretendard({ font: 1.6, weight: 700, color: Common.colors.GY900 })};
      line-height: 150%;
      text-align: center;
    }
  `;

  return (
    <>
      <Dimmer zIndex={201} onClick={() => setVisible(false)} />
      <Modal>
        {/* <DeleteModalBody setVisible={setVisible} /> */}
        {/* <PartDeleteBody setVisible={setVisible} /> */}
      </Modal>
    </>
  );
};

export default DeleteConfirm;
