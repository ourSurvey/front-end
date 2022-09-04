import styled from "@emotion/styled";
import { Common, Pretendard } from "styles/common";
import CreateSurveyHeader from "components/survey/CreateSurveyHeader";
import Part from "components/survey/template/Part";
import React, { useState, useEffect } from "react";
import SubLayout from "components/SubLayout";
import { ISurveyData, ISection } from "types/survey";
import { surveyState } from "states/survey";
import { useRecoilState } from "recoil";

export default function Index() {
  const [surveyData, setSurveyData] = useRecoilState(surveyState);
  console.log(surveyData);

  const PartSectionContainer = styled.div`
    display: block;
    height: calc(100% - 54px) !important;

    & section:not(:last-child) {
    }

    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  `;

  return (
    <WriteContainer>
      <CreateSurveyHeader hasUnderLine={false} name="질문을 작성해주세요." step="02" />
      <PartSectionContainer id="section2">
        {surveyData.sections.map((_, index: number) => {
          return <Part PartNum={index} key={index} />;
        })}
      </PartSectionContainer>
    </WriteContainer>
  );
}

Index.getLayout = function getLayout(page: React.ReactElement) {
  return <SubLayout>{page}</SubLayout>;
};

const WriteContainer = styled.main`
  width: 100%;
  height: 100%;
  background-clip: padding-box;
  background-color: ${Common.colors.GY50};
`;
