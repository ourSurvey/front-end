import { useEffect } from "react";
import styled from "@emotion/styled";
import GreenCheck from "public/images/greenCheck.svg";
import PinkExcalmationMark from "public/images/pinkExclamationMark.svg";
import { Common, Pretendard } from "styles/common";
import { toastState } from "states/modal";
import { useRecoilState } from "recoil";
type Props = {
  flag: "error" | "success"; //알럿의 색깔을 표시
  text: string;
  visible: boolean;
};

const Alert = (props: Props) => {
  const { flag, text, visible } = props;

  const [ToastState, setToastState] = useRecoilState(toastState);
  // useEffect(() => {
  //   if (visible) {
  //     setTimeout(() => {
  //       setToastState({...ToastState;
  //         ToastState.visible=false});
  //     }, 2000);
  //   }
  // }, [ToastState.visible]);

  return (
    <>
      {flag === "error" ? (
        <Error>
          <PinkExcalmationMark width="18" height="18" />
          {text}
        </Error>
      ) : (
        <Success>
          <GreenCheck width="18" height="18" />
          {text}
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
