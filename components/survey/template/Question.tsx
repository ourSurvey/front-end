import React, { useState } from "react";
import styled from "@emotion/styled";
import More from "public/icon/vertical-three-dots.svg";
import { Common, Pretendard } from "styles/common";
import Toggle from "components/common/Toggle";
import QusetionTitle from "./QusetionTitle";
import SelectOptionContainer from "./SelectOptionContainer";

const Question = () => {
  const [toggle, settoggle] = useState(false);

  return (
    <Container>
      <Header>
        <Title>
          <span className="part">PT1</span>
          <span className="question-num">질문 1.</span>
        </Title>
        <div className="right">
          <Toggle name="필수" toggle={toggle} setToggle={settoggle} />
          <More />
        </div>
      </Header>

      <TitleContainer>
        <QusetionTitle hasImageInput={false} />
      </TitleContainer>
      <SelectOptionContainer />
    </Container>
  );
};

export default Question;

const Container = styled.div`
  padding-top: 37px;
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
