import Close from "public/icon/close.svg";
import Insta from "public/icon/insta.svg";
import Kakao from "public/icon/kakao.svg";
import Dimmer from "components/common/Dimmer";
import styled from "@emotion/styled";
import { Pretendard, Common } from "styles/common";
import { useRouter } from "next/router";
const Share = () => {
  const router = useRouter();
  console.log(router.asPath);

  return (
    <>
      <Dimmer onClick={() => router.replace(router.asPath)} />
      <Modal>
        <Close />
        <span>공유하기</span>
        <IconContainer>
          <div className="center">
            <div className="icons">
              <Kakao />
              <Insta />
            </div>
            <div className="copy">
              <input type="text" name="url" disabled />
              <button>URL 복사</button>
            </div>
          </div>
        </IconContainer>
      </Modal>
    </>
  );
};

export default Share;

const Modal = styled.div`
  position: absolute;
  padding: 23px 25px;
  display: block;
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
      top: 5px;
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
