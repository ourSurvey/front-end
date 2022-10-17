import Dimmer from 'components/common/Dimmer';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { useEffect, useState } from 'react';

interface IProps {
  visibleState: boolean;
  setVisible: (state: boolean) => void;
  children: JSX.Element;
  height: number;
  className?: string;
}

interface IStyle {
  height: number;
  visible: boolean;
}

const ModalTemplate = ({ visibleState, setVisible, children, height, className }: IProps) => {
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (visibleState) {
      setOpen(true);
    } else {
      timeoutId = setTimeout(() => setOpen(false), 130);
    }

    return () => {
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
    };
  }, [visibleState]);
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
    animation: ${({ visible }) => (visible ? fadein : fadeout)} 0.2s ease-out;
    width: 100%;
    bottom: 0;
    height: ${({ height, className }) =>
      className === 'date-picker-modal' ? `calc(${height}% + 84px)` : `${height}%`};
    border-radius: 30px 30px 0px 0px;
    background-color: #fff;
    z-index: 202;

    & .date-picker-modal {
      height: ${({ height }) => `calc(${height}% + 84px)`};
    }
  `;

  if (!open) {
    return null;
  }

  return (
    <>
      <Dimmer zIndex={201} onClick={onClose} />
      <Modal className={className && className} visible={visibleState} height={height}>
        {children}
      </Modal>
    </>
  );
};

export default ModalTemplate;
