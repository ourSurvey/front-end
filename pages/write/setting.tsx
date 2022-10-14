import CreateSurveyHeader from 'components/survey/CreateSurveyHeader';
import TImeTaken from 'components/survey/setting/TImeTaken';
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Common, Pretendard, SpaceBetween } from 'styles/common';
import SubLayout from 'components/SubLayout';
import AddTag from 'components/survey/setting/AddTag';
import ShareResult from 'components/survey/setting/ShareResult';
import CommentRespondent from 'components/survey/setting/CommentRespondent';
import { GetServerSideProps } from 'next';
import { withAuth } from 'utills/isLoggedIn';
import { useMutation } from 'react-query';
import { createSurvey } from 'services/api/survey';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { toastState } from 'states/modal';
import { surveySelector } from 'states/survey';
import { deleteIDproperty } from 'utills/deleteIdProperty';
import { useHeaderScroll } from 'hooks/useHeaderScroll';
import Portal from 'components/common/Portal';
import SurveySkeleton from 'components/skeleton/SurveySkeleton';
import ModalTemplate from 'components/modal/ModalTemplate';
import SurveyUpLoadAlert from 'components/modal/SurveyUpLoadAlert';
import LackPointModal from 'components/modal/LackPointModal';
import { useQuery } from 'react-query';
import { getMyPoint } from 'services/api/point';
import { Button } from 'components/common/Button';
import PeriodSettingWrapper from 'components/survey/setting/PeriodSettingWrapper';

export const getServerSideProps: GetServerSideProps = withAuth(() => {
  return {
    props: {},
  };
});

const Placeholder: React.FC = () => (
  <ItemContainer>
    <DateContainer>
      <SurveySkeleton width={200} height={25} rounded />
    </DateContainer>
    <DateContainer>
      <SurveySkeleton width={100} wUnit="%" height={36} />
    </DateContainer>
    <SurveySkeleton width={100} wUnit="%" height={36} />
  </ItemContainer>
);
export default function Setting() {
  const setToastState = useSetRecoilState(toastState);
  const [closinTitle, setClosinTitle] = useState('설문이 종료되었습니다');
  const [closingComment, setclosingComment] = useState('응답해주셔서 감사합니다.');
  const [showModal, setShowModal] = useState(false);
  const state = useRecoilValue(surveySelector);
  const { hide, scrollDetectHandler } = useHeaderScroll();

  const { isLoading, data } = useQuery(['point'], () => getMyPoint(), {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const createSurveyHandler = useMutation(createSurvey, {
    onSuccess: (data) => {
      if (data.status === 200) {
        setToastState({
          text: '설문이 정상적으로 생성되었습니다!',
          toastType: 'success',
          visible: true,
        });
      }
    },
    onError: (data: any) => {
      setToastState({
        text: data.response?.data.message,
        toastType: 'error',
        visible: true,
      });
    },
  });

  const createSurveyButton = () => {
    const sendState = deleteIDproperty(state);
    createSurveyHandler.mutate({ ...sendState, id: '', closingComment: `${closinTitle}|${closingComment}`, tempFl: 0 });
    console.log({ ...sendState, id: '', closingComment: `${closinTitle}|${closingComment}`, tempFl: 0 });
  };

  const temporaryStorageHandler = () => {
    const sendState = deleteIDproperty(state);
    createSurveyHandler.mutate({ ...sendState, id: '', closingComment: `${closinTitle}|${closingComment}`, tempFl: 1 });
    console.log({ ...sendState, id: '', closingComment: `${closinTitle}|${closingComment}`, tempFl: 1 });
  };

  if (isLoading) {
    return (
      <SettingPage>
        <HeaderWrap className={!hide ? 'hide' : ''}>
          <CreateSurveyHeader name="설정" hasUnderLine={true} step="03" />
        </HeaderWrap>
        <div css={{ marginTop: '64px' }}>
          <Placeholder />
          <Placeholder />
          <Placeholder />
          <Placeholder />
          <Placeholder />
        </div>
      </SettingPage>
    );
  }

  return (
    <SettingPage>
      <HeaderWrap className={!hide ? 'hide' : ''}>
        <CreateSurveyHeader name="설정" hasUnderLine={true} step="03" />
      </HeaderWrap>
      <SettingItemContainer onScroll={scrollDetectHandler}>
        <PeriodSettingWrapper />
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
          <Button
            fontFamily="pretendard"
            fontSize={1.2}
            fontWeight={400}
            textColor={Common.colors.GY900}
            isDisabled={false}
            color="transparent"
            wUnit="%"
            width={33}
            btnText="임시저장"
            className="temporary-storage"
            onClick={temporaryStorageHandler}
          />

          <Button
            fontFamily="pretendard"
            fontSize={1.2}
            fontWeight={700}
            textColor="#fff"
            isDisabled={false}
            color={Common.colors.BL500}
            btnText="설문 업로드"
            className="upload"
            onClick={() => setShowModal(true)}
          />
        </BtnContainer>
      </SettingItemContainer>

      <Portal selector="#portal">
        {data.data < 500 ? (
          <ModalTemplate visibleState={showModal} setVisible={setShowModal} height={50}>
            <LackPointModal setVisible={setShowModal} point={data.data} />
          </ModalTemplate>
        ) : (
          <ModalTemplate visibleState={showModal} setVisible={setShowModal} height={25}>
            <SurveyUpLoadAlert setVisible={setShowModal} point={data.data} upload={createSurveyButton} />
          </ModalTemplate>
        )}
      </Portal>
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
  padding-top: 61.5px;

  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const BtnContainer = styled.footer`
  width: 100%;
  position: fixed;
  bottom: 0;
  ${SpaceBetween()};
  border-top: 1px solid ${Common.colors.GY200};
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
  }
  & .upload {
    width: calc(67% - 7px);
    background-color: ${Common.colors.BL500};
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

const ItemContainer = styled.div`
  background-color: #fff;
  padding: 15px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.16);
  border-radius: 5px;
  margin-bottom: 24px;
`;

const DateContainer = styled.div`
  margin-bottom: 10px;
`;
