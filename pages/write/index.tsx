import styled from "@emotion/styled";
import { Common, Pretendard } from "styles/common";
import CreateSurveyHeader from "components/survey/CreateSurveyHeader";
import Part from "components/survey/template/Part";
import React, { useState, useEffect } from "react";
import SubLayout from "components/SubLayout";
import { ISurveyData, ISection } from "types/survey";

export default function Index() {
  const [surveyData, setSurveyData] = useState<ISurveyData>({
    id: 0,
    subject: "",
    content: "",
    startDate: "",
    endDate: "",
    minute: 0,
    openFl: 1,
    tempFl: 1,
    closingComment: "",
    hashtag: [],
    sections: [
      {
        title: "", //섹션제목,
        content: "", //설명,
        nextSection: -1, //*다음섹션(Integer|-1이면 이 섹션이 마지막 섹션, 사실 그냥 index값임 프론트에서도 설문 만들 때 정렬해서 보여줘야하니깐 index값 그대로 넣기),
        questions: [
          {
            ask: "",
            explain: "",
            multiFl: 1,
            essFl: 0,
            dupFl: 0,
            oder: 0,
            questionItems: [{ content: "", oder: 0, nextSection: 0 }],
          },
        ],
      },
    ],
  });

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
          return <Part PartNum={index} surveyData={surveyData} key={index} setSection={setSurveyData} />;
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
