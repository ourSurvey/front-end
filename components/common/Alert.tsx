import { useEffect } from 'react';
import styled from '@emotion/styled';
import GreenCheck from 'public/images/greenCheck.svg';
import PinkExcalmationMark from 'public/images/pinkExclamationMark.svg';
import { Common, Pretendard, AlignAndJustifyCenter } from 'styles/common';
import { toastState } from 'states/modal';
import { useRecoilState } from 'recoil';
import { css, keyframes } from '@emotion/react';
import { showToastState } from 'states/modal';
import { useRecoilValue } from 'recoil';
import { hasNavbar } from 'utills/hasNavbar';
import { useRouter } from 'next/router';
const Alert = () => {
  const [ToastState, setToastState] = useRecoilState(toastState);
  const visible = useRecoilValue(showToastState);
  const router = useRouter();

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
    visibility: ${visible ? `visible` : 'hidden'};
    animation: ${visible ? fadein : fadeout} 0.2s ease-out;
    transition: visibility 0.2s ease-out;
    margin-bottom: ${hasNavbar(router.asPath) ? '27px' : ''}; //nav바가 있다면 알럿 위치 위로 올림
    padding: 21.5px 20px 35px 20px;
    left: 0;
    right: 0;
    z-index: 300;
  `;

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (ToastState.visible) {
      timeoutId = setTimeout(() => {
        setToastState({
          ...ToastState,
          visible: false,
        });
      }, 2000);
    }
    return () => {
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ToastState]);

  return (
    <div css={toast} role="alert">
      {ToastState.toastType === 'error' ? (
        <Error>
          <PinkExcalmationMark width="18" height="18" />
          {ToastState.text}
        </Error>
      ) : (
        <Success>
          <GreenCheck width="18" height="18" />
          {ToastState.text}
        </Success>
      )}
    </div>
  );
};

export default Alert;

const Error = styled.div`
  ${AlignAndJustifyCenter()};
  height: 48px;
  width: 100%;
  border: 2px solid ${Common.colors.PK500};
  box-shadow: 0px 4px 8px rgba(94, 93, 139, 0.14);
  border-radius: 30px;
  ${Pretendard({ font: 1.3, weight: 700, color: Common.colors.GY900 })}
`;

const Success = styled.div`
  ${AlignAndJustifyCenter()};
  height: 48px;
  width: 100%;
  border: 2px solid ${Common.colors.GR500};
  box-shadow: 0px 4px 8px rgba(94, 93, 139, 0.14);
  border-radius: 30px;
  ${Pretendard({ font: 1.3, weight: 700, color: Common.colors.GY900 })}
`;
