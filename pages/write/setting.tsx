import CreateSurveyHeader from "components/survey/CreateSurveyHeader";
import PeriodSetting from "components/survey/setting/PeriodSetting";
import TImeTaken from "components/survey/setting/TImeTaken";
import React from "react";
import styled from "@emotion/styled";
import { Common, Pretendard, SpaceBetween } from "styles/common";
import SubLayout from "components/SubLayout";
import AddTag from "components/survey/setting/AddTag";
import ShareResult from "components/survey/setting/ShareResult";
import CommentRespondent from "components/survey/setting/CommentRespondent";
import { GetServerSideProps } from "next";
import { withAuth } from "utills/isLoggedIn";

export const getServerSideProps: GetServerSideProps = withAuth(() => {
  return {
    props: {},
  };
});
export default function Setting() {
  return (
    <SettingPage>
      <CreateSurveyHeader name="설정" hasUnderLine={true} step="3" />
      <SettingItemContainer>
        <PeriodSetting />
        <TImeTaken />
        <AddTag />
        <ShareResult />
        <CommentRespondent />
        <BtnContainer>
          <button className="temporary-storage">임시저장</button>
          <button className="upload">설문 업로드</button>
        </BtnContainer>
      </SettingItemContainer>
    </SettingPage>
  );
}

Setting.getLayout = function getLayout(page: React.ReactElement) {
  return <SubLayout>{page}</SubLayout>;
};

const SettingPage = styled.main`
  height: 100%;
  background-color: ${Common.colors.GY50};
  & h1 {
    ${Pretendard({ font: 1.6, weight: 700, color: Common.colors.GY900 })};
    margin: 0;
    line-height: 150%;
  }

  & section {
    margin-bottom: 10px;

    &:last-of-type {
      margin-bottom: 1px;
    }
  }
`;

const SettingItemContainer = styled.div`
  display: block;
  height: calc(100% - 54px) !important;
  width: 100%;

  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const BtnContainer = styled.footer`
  ${SpaceBetween()};
  background-color: #fff;
  padding: 13px 20px 34px 20px;
  & button {
    outline: none;
    border: none;
    border-radius: 5px;

    height: 36px;
    line-height: 150%;
  }

  & .temporary-storage {
    width: 33%;
    border: 1px solid ${Common.colors.GY700};
    ${Pretendard({ font: 1.2, weight: 400, color: Common.colors.GY900 })}
    background-color:#fff;
  }
  & .upload {
    width: calc(67% - 7px);
    background-color: ${Common.colors.BL500};
    ${Pretendard({ font: 1.2, weight: 700, color: "#fff" })};
  }
`;
