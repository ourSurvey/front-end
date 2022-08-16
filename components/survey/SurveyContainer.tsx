import React from "react";
import styled from "@emotion/styled";
import SurveyItem from "./SurveyItem";
type Props = {};
import SurveySkeleton from "components/skeleton/SurveySkeleton";

const Placeholder: React.FC = () => (
  <ItemContainer>
    <UlContainer>
      <SurveySkeleton width={60} height={19} />
      &nbsp;
      <SurveySkeleton width={60} height={19} />
    </UlContainer>
    <SurveySkeleton width={200} height={25} rounded />
    <Content>
      <SurveySkeleton width={98} wUnit="%" height={18} rounded />
      <SurveySkeleton width={170} height={18} rounded />
    </Content>
    <DateContainer>
      <SurveySkeleton width={158} height={14} rounded />
    </DateContainer>
    <SurveySkeleton width={100} wUnit="%" height={36} />

    <Hashtag>
      <SurveySkeleton width={170} height={12} rounded />
    </Hashtag>
  </ItemContainer>
);

const SurveyContainer = (props: Props) => {
  return (
    <Container>
      <SurveyItem />
      <SurveyItem />
      <SurveyItem />
      <SurveyItem />
    </Container>
  );
};

export default SurveyContainer;

const Container = styled.div`
  height: 100%;
  padding: 5px 5px 10px 5px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ItemContainer = styled.div`
  padding: 15px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.16);
  border-radius: 14px;
  margin-bottom: 24px;
`;

const UlContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
  margin-top: 0px;
  padding: 0;
`;

const Content = styled.p`
  & span {
    margin-top: 5px;

    &:last-child {
      margin-bottom: 10px;
    }
  }
`;

const DateContainer = styled.div`
  margin-bottom: 10px;
`;

const Hashtag = styled.div`
  padding-top: 10px;
`;
