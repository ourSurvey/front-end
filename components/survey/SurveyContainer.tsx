import React from "react";
import styled from "@emotion/styled";
import SurveyItem from "./SurveyItem";
type Props = {};

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
  max-height: 80%;
  padding: 5px 5px 10px 5px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
