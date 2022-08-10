import { useEffect } from "react";
import styled from "@emotion/styled";
import GreenCheck from "public/images/greenCheck.svg";
import PinkExcalmationMark from "public/images/pinkExclamationMark.svg";
import { Common, Pretendard } from "styles/common";
import { toastState } from "states/modal";
import { useRecoilState } from "recoil";

const Alert = () => {
  const [ToastState, setToastState] = useRecoilState(toastState);

  useEffect(() => {
    if (ToastState.visible) {
      setTimeout(() => {
        setToastState({
          ...ToastState,
          visible: false,
        });
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ToastState]);

  return (
    <>
      {ToastState.toastType === "error" ? (
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
    </>
  );
};

export default Alert;

const Error = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;
  height: 48px;
  width: 100%;
  border: 2px solid ${Common.colors.PK500};
  box-shadow: 0px 4px 8px rgba(94, 93, 139, 0.14);
  border-radius: 30px;
  ${Pretendard({ font: 1.3, weight: 700, color: Common.colors.GY900 })}
`;

const Success = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  width: 100%;
  border: 2px solid ${Common.colors.GR500};
  box-shadow: 0px 4px 8px rgba(94, 93, 139, 0.14);
  border-radius: 30px;
  ${Pretendard({ font: 1.3, weight: 700, color: Common.colors.GY900 })}
`;
