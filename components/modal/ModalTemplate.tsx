import Dimmer from 'components/common/Dimmer';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { Pretendard, Common } from 'styles/common';

interface IProps {
  visibleState: boolean;
  setVisible: (state: boolean) => void;
  children: JSX.Element;
  height: number;
}

interface IStyle {
  height: number;
}

const ModalTemplate = ({ visibleState, setVisible, children, height }: IProps) => {
  const fadein = keyframes`
  from {bottom: -${height}%; opacity: 0;}
  to {bottom: 0; opacity: 1;}
`;
  const fadeout = keyframes`
  from {bottom: 0; opacity: 1;}
  to {bottom: -${height}%; opacity: 0;}
`;

  const Modal = styled.div<IStyle>`
    position: absolute;
    padding: 23px 25px;
    display: block;
    animation: ${visibleState ? fadein : fadeout} 0.2s ease-out;
    width: 100%;
    bottom: 0;
    height: ${(props) => props.height}%;
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
      <Modal height={height}>{children}</Modal>
    </>
  );
};

export default ModalTemplate;
