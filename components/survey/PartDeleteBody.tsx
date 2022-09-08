import styled from "@emotion/styled";
import { Pretendard, Common } from "styles/common";
import { toastState } from "states/modal";
import { useRecoilState } from "recoil";

type Props = {
  setVisible: (bool: boolean) => void;
};

const PartDeleteBody = ({ setVisible }: Props) => {
  return (
    <Confirm>
      <span>질문과 파트 모두 삭제 하시겠습니까?</span>
      <p>
        파트에 속한 질문이 없을 경우
        <br />
        파트도 함께 삭제됩니다.
      </p>
      <div className="btn-container">
        <button onClick={() => setVisible(false)}>취소</button>
        <button className="del">모두 삭제</button>
      </div>
    </Confirm>
  );
};

export default PartDeleteBody;

const Confirm = styled.div`
  display: flex;
  height: 100%;
  justify-content: space-between;
  flex-direction: column;

  .btn-container {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }
  & p {
    margin: 0;
    ${Pretendard({ weight: 400, font: 1.3, color: "#333333" })};
    letter-spacing: -0.03em;
    text-align: center;
    line-height: 150%;
  }
  & span {
    display: inline-block;
    ${Pretendard({ weight: 700, font: 1.6, color: Common.colors.GY900 })};
    letter-spacing: -0.03em;
  }

  & button {
    width: 100px;
    ${Pretendard({ weight: 400, font: 1.2, color: Common.colors.GY900 })};
    outline: none;
    background-color: #fff;
    border: 1px solid ${Common.colors.GY900};
    border-radius: 5px;
    &:first-of-type {
      margin-right: 10px;
    }
  }
  & .del {
    ${Pretendard({ weight: 700, font: 1.2, color: Common.colors.alert500 })};
    border: 1px solid ${Common.colors.alert500};
  }
`;
