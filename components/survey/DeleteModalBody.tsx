import styled from "@emotion/styled";
import { Pretendard, Common } from "styles/common";
import { toastState } from "states/modal";
import { useRecoilState } from "recoil";

type Props = {
  setVisible: (bool: boolean) => void;
};

const DeleteModalBody = ({ setVisible }: Props) => {
  return (
    <Confirm>
      <span>질문을 정말 삭제 하시겠습니까?</span>
      <div className="btn-container">
        <button onClick={() => setVisible(false)}>취소</button>
        <button className="del">삭제</button>
      </div>
    </Confirm>
  );
};

export default DeleteModalBody;

const Confirm = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;

  .btn-container {
    display: flex;
    justify-content: center;
  }
  & span {
    display: inline-block;
    ${Pretendard({ weight: 700, font: 1.6, color: Common.colors.GY900 })};

    margin-bottom: 30px;
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
