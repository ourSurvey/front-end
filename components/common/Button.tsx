import { useState, useEffect } from 'react';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { Common, Pretendard, Roboto } from 'styles/common';
interface IProp {
  color: string;
  fontFamily?: 'pretendard' | 'roboto';
  fontWeight?: number;
  fontSize?: number;
  btnText: string | JSX.Element;
  textColor: string;
  wUnit?: string;
  hUnit?: string;
  width?: number;
  height?: number;
  className?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: (e?: any) => void;
  isDisabled: boolean;
}

interface IBtnStyle {
  textColor: string;
  color: string;
  isDisabled: boolean;
  wUnit?: string;
  hUnit?: string;
  width?: number;
  height?: number;
}

interface KeyframeProps {
  color: string;
}
interface IBtnText {
  textColor: string;
  fontSize: number;
  fontWeight: number;
  fontFamily: 'pretendard' | 'roboto';
}

export const Button = (props: IProp) => {
  const {
    color,
    textColor,
    isDisabled,
    onClick,
    btnText,
    type,
    className,
    fontWeight = 700,
    fontSize = 1.4,
    fontFamily = 'pretendard',
    wUnit = '%',
    hUnit = 'px',
    width = 100,
    height = 50,
  } = props;
  const [coords, setCoords] = useState({ x: -1, y: -1 });
  const [isRippling, setIsRippling] = useState(false);

  useEffect(() => {
    if (coords.x !== -1 && coords.y !== -1) {
      setIsRippling(true);
      setTimeout(() => {
        setIsRippling(false);
      }, 300);
    } else setIsRippling(false);
  }, [coords]);

  useEffect(() => {
    if (!isRippling) setCoords({ x: -1, y: -1 });
  }, [isRippling]);

  return (
    <ButtonContainer
      textColor={textColor}
      color={color}
      isDisabled={isDisabled}
      type={type}
      disabled={isDisabled}
      className={className && className}
      wUnit={wUnit}
      hUnit={hUnit}
      width={width}
      height={height}
      onClick={(e: any) => {
        const rect = e.target.getBoundingClientRect();
        setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        onClick != null && onClick(e);
      }}
    >
      {isRippling ? <Ripple color={color} css={{ left: coords.x, top: coords.y }} /> : ''}
      <BtnText textColor={textColor} fontWeight={fontWeight} fontSize={fontSize} fontFamily={fontFamily}>
        {btnText}
      </BtnText>
    </ButtonContainer>
  );
};

const ButtonContainer = styled.button<IBtnStyle>`
  height: ${({ height, hUnit }) => height && hUnit && `${height}${hUnit}`};
  width: ${({ width, wUnit }) => width && wUnit && `${width}${wUnit}`};
  border-radius: 10px;
  outline: 0;
  border: 0;
  overflow: hidden;
  position: relative;
  background-color: ${(props) => props.color};
  opacity: ${(props) => (!props.isDisabled ? 1 : 0.35)};
`;

const rippleEffect = keyframes`
  0% {
    width:0px;
    height:0px;
    transform: scale(1);
    opacity: 0.2;
  }
  50% {
    transform: scale(10);
    opacity: 0.175;
  }
  100% {
    width:500px;
    height:500px;
    transform: scale(35);
    opacity: 0;
  }
`;

const Ripple = styled.span<KeyframeProps>`
  position: absolute;
  background: ${({ color }) => (color === '#fff' || color === 'transparent' ? Common.colors.GY300 : '#fff')};
  display: block;
  border-radius: 9999px;
  content: '';
  opacity: 1;
  animation: ${rippleEffect} 1s linear infinite;
`;

const BtnText = styled.span<IBtnText>`
  ${({ fontFamily, fontSize, fontWeight, textColor }) =>
    fontFamily === 'pretendard'
      ? Pretendard({ font: fontSize, weight: fontWeight, color: textColor })
      : Roboto({ font: fontSize, weight: fontWeight, color: textColor })};
`;
