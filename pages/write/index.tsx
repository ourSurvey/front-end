import styled from "@emotion/styled";
import { Common, Pretendard } from "styles/common";
import CreateSurveyHeader from "components/survey/CreateSurveyHeader";
import Part from "components/survey/template/Part";
import React, { useState, useEffect } from "react";
import SubLayout from "components/SubLayout";
import { ISurveyData, ISection } from "types/survey";
import { sectionIdListAtom } from "states/survey";
import { useRecoilValue } from "recoil";

export default function Index() {
  const partIdList = useRecoilValue(sectionIdListAtom);

  const PartSectionContainer = styled.div`
    display: block;
    height: calc(100% - 54px) !important;

    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  `;

  return (
    <WriteContainer>
      <CreateSurveyHeader hasUnderLine={false} name="질문을 작성해주세요." step="02" />
      <PartSectionContainer id="section2">
        {partIdList.map((id) => {
          return <Part ListLength={partIdList.length} PartNum={id} key={id} />;
        })}
      </PartSectionContainer>
      <BtnContainer>
        <button>임시저장</button>
        <Link href="/write/setting">
          <a>다음</a>
        </Link>
      </BtnContainer>
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

const BtnContainer = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0;
  height: 84px;
  background-color: #fff;
  padding: 14px 27px 0 20px;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid ${Common.colors.GY200};
  & button {
    height: 36px;
    border: 0;
    outline: 0;
    padding: 10px 15px;
    ${Pretendard({ font: 1.2, weight: 400, color: Common.colors.GY900 })};
    line-height: 150%;
    letter-spacing: -0.03em;
    border: 1px solid ${Common.colors.GY700};
    background-color: #fff;
    border-radius: 5px;
  }

  & a {
    height: 36px;
    padding: 10px 15px;
    background-color: ${Common.colors.BL500};
    ${Pretendard({ font: 1.2, weight: 700, color: "#fff" })};
    border-radius: 5px;
    line-height: 150%;
    letter-spacing: -0.03em;
  }
`;
