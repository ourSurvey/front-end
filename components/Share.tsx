import Close from "public/icon/close.svg";
import Insta from "public/icon/insta.svg";
import Kakao from "public/icon/kakao.svg";
import Dimmer from "components/common/Dimmer";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { Pretendard, Common } from "styles/common";
import { useRouter } from "next/router";
// import { toastState } from "states/modal";
// import { useRecoilState } from "recoil";

interface IProps {
  visibleState: boolean;
  setVisible: (state: boolean) => void;
}
const Share = ({ visibleState, setVisible }: IProps) => {
  const router = useRouter();
  const surveyUrl: string = `${process.env.NEXT_LOCAL_API}${router.asPath}`;
  // const [ToastState, setToastState] = useRecoilState(toastState);
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
      letter-spacing: -0.03em;
    }
  `;

  const handleCopy = () => {
    if (navigator.clipboard) {
      // (IE는 사용 못하고, 크롬은 66버전 이상일때 사용 가능합니다.)
      navigator.clipboard
        .writeText(surveyUrl)
        .then(() => {
          alert("클립보드에 복사되었습니다.");
          // setToastState({
          //   ...ToastState,
          //   visible: true,
          //   text: "클립보드에 복사되었습니다.",
          //   toastType: "success",
          // });
        })
        .catch(() => {
          alert("복사를 다시 시도해주세요.");
          // setToastState({
          //   ...ToastState,
          //   visible: true,
          //   text: "복사를 다시 시도해주세요.",
          //   toastType: "error",
          // });
        });
    } else {
      // 흐름 2.
      if (!document.queryCommandSupported("copy")) {
        alert("복사하기가 지원되지 않는 브라우저입니다.");
        // return setToastState({
        //   ...ToastState,
        //   visible: true,
        //   text: "복사하기가 지원되지 않는 브라우저입니다.",
        //   toastType: "error",
        // });
      }

      // 흐름 3.
      const textarea: HTMLTextAreaElement = document.createElement("textarea");
      textarea.value = surveyUrl;
      textarea.style.top = "0";
      textarea.style.left = "0";
      textarea.style.position = "fixed";

      // 흐름 4.
      document.body.appendChild(textarea);
      // focus() -> 사파리 브라우저 서포팅
      textarea.focus();
      // select() -> 사용자가 입력한 내용을 영역을 설정할 때 필요
      textarea.select();
      // 흐름 5.
      document.execCommand("copy");
      // 흐름 6.
      document.body.removeChild(textarea);
      alert("클립보드에 복사되었습니다.");
      // setToastState({
      //   ...ToastState,
      //   visible: true,
      //   text: "클립보드에 복사되었습니다.",
      //   toastType: "success",
      // });
    }
  };

  return (
    <>
      <Dimmer onClick={() => setVisible(false)} />
      <Modal>
        <Close onClick={() => setVisible(false)} />
        <span>공유하기</span>
        <IconContainer>
          <div className="center">
            <div className="icons">
              <Kakao />
              <Insta />
            </div>
            <div className="copy">
              <input type="text" name="url" disabled defaultValue={surveyUrl} />
              <button onClick={() => handleCopy()}>URL 복사</button>
            </div>
          </div>
        </IconContainer>
      </Modal>
    </>
  );
};

export default Share;

const IconContainer = styled.div`
  margin-top: 21px;
  height: 60%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  & .center {
    height: 100%;
    width: 70%;
    display: flex;
    flex-direction: column;

    justify-content: space-between;
  }
  & .icons {
    display: flex;
    height: calc(100% - 50px);
    width: 100%;
    justify-content: space-between;
  }
  & svg {
    display: inline;
    position: static;
  }

  & .copy {
    width: 100%;
    position: relative;
    display: flex;
    justify-content: space-between;

    & input {
      width: 100%;
      height: 40px;
      padding-left: 10px;
      border: 1px solid ${Common.colors.GY100};
      border-radius: 5px;
      background-color: ${Common.colors.GY50};
      ${Pretendard({ font: 1.2, weight: 400, color: Common.colors.GY700 })};
      line-height: 150%;
      letter-spacing: -0.03em;
    }
    & button {
      position: absolute;
      right: 5px;
      height: 28px;
      width: 65px;
      top: 6px;
      background-color: ${Common.colors.GY700};
      outline: none;
      border: none;
      border-radius: 3px;
      ${Pretendard({ font: 1.2, weight: 700, color: "#fff" })};
      line-height: 150%;
      letter-spacing: -0.03em;
    }
  }
`;
