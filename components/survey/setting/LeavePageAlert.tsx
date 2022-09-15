import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { Pretendard, Common, SpaceBetween } from "styles/common";

type Props = {
  setVisible: (bool: boolean) => void;
  setLeavePage: () => void;
};

const LeavePageAlert = ({ setVisible, setLeavePage }: Props) => {
  const router = useRouter();
  return (
    <Confirm>
      <span>페이지를 나가시겠습니까?</span>
      <p>
        지금 페이지를 나가면
        <br />
        입력한 태그들이 저장되지 않습니다.
      </p>
      <div className="btn-container">
        <button onClick={() => setVisible(false)}>취소</button>
        <button className="del" onClick={setLeavePage}>
          나가기
        </button>
      </div>
    </Confirm>
  );
};

export default LeavePageAlert;

const Confirm = styled.div`
  ${SpaceBetween()}
  height: 100%;
  flex-direction: column;

  .btn-container {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }
  & p {
    margin: 0;
    ${Pretendard({ weight: 400, font: 1.3, color: "#333333" })};

    text-align: center;
    line-height: 150%;
  }
  & span {
    display: inline-block;
    ${Pretendard({ weight: 700, font: 1.6, color: Common.colors.GY900 })};
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
