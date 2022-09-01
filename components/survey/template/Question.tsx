import { useState } from "react";
import styled from "@emotion/styled";
import More from "public/icon/vertical-three-dots.svg";
import { Common, Pretendard } from "styles/common";
import Toggle from "components/common/Toggle";
import QusetionTitle from "./QusetionTitle";
import SelectOptionContainer from "./SelectOptionContainer";
import Portal from "components/common/Portal";
import MoreSideModal from "../MoreSideModal";
import { IQuestion, ISection } from "types/survey";

interface IProps {
  setPart: (part: ISection) => void;
}

const Question = ({ setPart }: IProps) => {
  const [toggle, settoggle] = useState(false);
  const [visibleMore, setVisibleMore] = useState(false);
  const [Qusetion, setQusetion] = useState<IQuestion>({
    ask: "",
    explain: "",
    multiFl: 1,
    essFl: 0,
    dupFl: 0,
    oder: 0,
    questionItems: [],
  });
  return (
    <Container className="question">
      <Header>
        <Title>
          <span className="part">PT1</span>
          <span className="question-num">질문 1.</span>
        </Title>
        <div className="right">
          <Toggle name="필수" toggle={toggle} setToggle={settoggle} />
          <More onClick={() => setVisibleMore(true)} />
        </div>
      </Header>

      <TitleContainer>
        <QusetionTitle placeHolder="질문" value={Qusetion} setValue={setQusetion} hasImageInput={true} />
      </TitleContainer>
      <SelectOptionContainer />
      <Portal selector="#portal">{visibleMore ? <MoreSideModal visibleState={visibleMore} setVisible={setVisibleMore} /> : null}</Portal>
    </Container>
  );
};

export default Question;

const Container = styled.div`
  background-color: #fff;
  padding: 37px 20px 0 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;

  & .right {
    display: flex;
  }
  & svg {
    margin-left: 14px;
  }
`;

const Title = styled.div`
  & .part {
    ${Pretendard({ font: 1, weight: 700, color: Common.colors.GR500 })};
    line-height: 150%;
    background-color: ${Common.colors.GR50};
    border-radius: 4px;
    padding: 1px 4px;
    margin-right: 4px;
    letter-spacing: -0.03em;
  }

  & .question-num {
    ${Pretendard({ font: 1, weight: 700, color: Common.colors.GY700 })};
    line-height: 150%;
    letter-spacing: -0.03em;
  }
`;

const TitleContainer = styled.div``;
