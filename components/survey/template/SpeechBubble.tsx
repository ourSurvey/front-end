import styled from "@emotion/styled";
import { Common, Pretendard, Roboto, AlignAndJustifyCenter } from "styles/common";
import Arrow from "public/icon/underArrow.svg";
import { PartIDFormat } from "utills/getDateSixth";
import { sectionListAtomFamily } from "states/survey";
import { useRecoilValue } from "recoil";
import Portal from "components/common/Portal";
import ModalTemplate from "components/modal/ModalTemplate";
import { useState } from "react";
import NextPartSectionModal from "components/modal/NextPartSectionModal";
interface IProps {
  partNum: number;
  color: string;
  partLength: number;
}

interface IStyle {
  color: string;
}

const SpeechBubble = ({ partNum, color, partLength }: IProps) => {
  const partData = useRecoilValue(sectionListAtomFamily(PartIDFormat(partNum)));
  const [showModalState, setshowModalState] = useState(false);
  return (
    <BubbleContiner color={color}>
      <div>
        <strong>Part{partNum}.</strong>
        <h1>{partData.title === "" ? "(제목없음)" : partData.title}</h1>
      </div>
      <h2>다음으로 어디로 이동할까요?</h2>
      <button onClick={() => setshowModalState(true)}>
        <span>다음 파트</span>로 진행하기
        <Arrow />
      </button>
      {showModalState && (
        <Portal selector="#portal">
          <ModalTemplate height={50} visibleState={showModalState} setVisible={setshowModalState}>
            <NextPartSectionModal partLength={partLength} partName={partData.title} partNum={partNum} setVisible={setshowModalState} />
          </ModalTemplate>
        </Portal>
      )}
    </BubbleContiner>
  );
};

export default SpeechBubble;

const BubbleContiner = styled.div<IStyle>`
  ${AlignAndJustifyCenter()}
  flex-direction:column;
  position: relative;
  margin-top: 24px;
  height: 140px;
  width: calc(100% - 40px);
  left: 20px;
  background: ${Common.colors.GY900};
  color: white;
  border-radius: 10px;
  padding: 12px 12.8px;
  margin-bottom: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.24);

  &::after {
    content: "";
    position: absolute;
    top: -10px;
    left: calc(50% - 14.5px);
    border-left: 14.5px solid transparent;
    border-right: 14.5px solid transparent;
    border-bottom: 10px solid ${Common.colors.GY900};
  }

  & strong {
    display: inline;
    ${Pretendard({ font: 1.2, weight: 700, color: Common.colors.GY100 })};
    line-height: 150%;
    margin-right: 4px;
  }
  & h1 {
    display: inline;
    ${Pretendard({ font: 1.2, weight: 700, color: Common.colors.GY100 })};
    line-height: 150%;
  }
  & h2 {
    ${Roboto({ font: 1.4, weight: 700, color: Common.colors.GY100 })};
    line-height: 150%;
  }
  & button {
    ${AlignAndJustifyCenter()};

    padding: 7px 10px;
    background-color: ${(props) => (props.color === "pink" ? Common.colors.PK500 : Common.colors.GR500)};
    border-radius: 60px;
    width: 100%;

    ${Roboto({ font: 1.2, weight: 400, color: Common.colors.GY100 })};
    line-height: 150%;
    outline: none;
    border: none;
    color: #fff;

    & span {
      font-weight: 700;
    }
  }

  & svg {
    margin-left: 4px;
  }
`;
