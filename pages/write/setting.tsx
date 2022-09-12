import CreateSurveyHeader from "components/survey/CreateSurveyHeader";
import PeriodSetting from "components/survey/setting/PeriodSetting";
import TImeTaken from "components/survey/setting/TImeTaken";
import React from "react";
import styled from "@emotion/styled";
import { Common, Pretendard } from "styles/common";
import SubLayout from "components/SubLayout";
export default function Setting() {
  return (
    <SettingPage>
      <CreateSurveyHeader name="설정" hasUnderLine={true} step="3" />

      <PeriodSetting />
      <TImeTaken />
    </SettingPage>
  );
}

Setting.getLayout = function getLayout(page: React.ReactElement) {
  return <SubLayout>{page}</SubLayout>;
};

const SettingPage = styled.main`
  background-color: ${Common.colors.GY50};
  & h1 {
    ${Pretendard({ font: 1.6, weight: 700, color: Common.colors.GY900 })};
    margin: 0;
    line-height: 150%;
    letter-spacing: -0.03em;
  }

  & section {
    margin-bottom: 10px;
  }
`;