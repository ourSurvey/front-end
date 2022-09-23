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
import { useMutation } from "react-query";
import { createSurvey } from "services/api/survey";
import { useRecoilState, useRecoilValue } from "recoil";
import { toastState } from "states/modal";
import { surveySelector } from "states/survey";
import { useHeaderScroll } from "hooks/useHeaderScroll";
export const getServerSideProps: GetServerSideProps = withAuth(() => {
  return {
    props: {},
  };
});
export default function Setting() {
  const [ToastState, setToastState] = useRecoilState(toastState);
  const [closinTitle, setClosinTitle] = useState("설문이 종료되었습니다");
  const [closingComment, setclosingComment] = useState("응답해주셔서 감사합니다.");
  const state = useRecoilValue(surveySelector);
  const { hide, scrollDetectHandler } = useHeaderScroll();
  const createSurveyHandler = useMutation(createSurvey, {
    onSuccess: (data) => {
      if (data.status === 200) {
        setToastState({
          text: "설문이 정상적으로 생성되었습니다!",
          toastType: "success",
          visible: true,
        });
      }
    },
    onError: (data) => {
      console.log(data);
    },
  });

  const createSurveyButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("클릭");

    createSurveyHandler.mutate({ ...state, id: "" });
  };
  return (
    <SettingPage>
      <HeaderWrap className={!hide ? "hide" : ""}>
        <CreateSurveyHeader name="설정" hasUnderLine={true} step="3" />
      </HeaderWrap>
      <SettingItemContainer onScroll={scrollDetectHandler}>
        <PeriodSetting />
        <TImeTaken />
        <AddTag />
        <ShareResult />
        <CommentRespondent
          closinTitle={closinTitle}
          closingComment={closingComment}
          setClosinTitle={setClosinTitle}
          setclosingComment={setclosingComment}
        />
        <BtnContainer>
          <button className="temporary-storage">임시저장</button>
          <button className="upload" onClick={createSurveyButton}>
            설문 업로드
          </button>
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

const HeaderWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  transition: 0.4s ease;

  &.hide {
    transform: translateY(-60.5px);
  }
`;
