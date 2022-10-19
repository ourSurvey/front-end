import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { getMyPoint } from 'services/api/point';
import { useMutation } from 'react-query';
import { Common, Pretendard } from 'styles/common';
import { createSurvey } from 'services/api/survey';
import { deleteIDproperty } from 'utills/deleteIdProperty';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { toastState } from 'states/modal';
import { surveySelector } from 'states/survey';
import styled from '@emotion/styled';
import Setting from './Setting';
import Portal from 'components/common/Portal';
import ModalTemplate from 'components/modal/ModalTemplate';
import SurveyUpLoadAlert from 'components/modal/SurveyUpLoadAlert';
import LackPointModal from 'components/modal/LackPointModal';
import SurveySkeleton from 'components/skeleton/SurveySkeleton';

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

const SettingWrapper = () => {
  const [showModal, setShowModal] = useState(false);
  const [closinTitle, setClosinTitle] = useState('설문이 종료되었습니다');
  const [closingComment, setclosingComment] = useState('응답해주셔서 감사합니다.');
  const setToastState = useSetRecoilState(toastState);
  const state = useRecoilValue(surveySelector);
  const { isLoading, data } = useQuery(['point'], () => getMyPoint(), {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const temporarySurveyHandler = useMutation(createSurvey, {
    onSuccess: (data) => {
      if (data.status === 200) {
        setToastState({
          text: '임시저장 되었습니다.',
          toastType: 'success',
          visible: true,
          marginPosition: 0,
          hUnit: 'px',
        });
      }
    },
    onError: (data: any) => {
      setToastState({
        text: data.response?.data.message,
        toastType: 'error',
        visible: true,
        marginPosition: 0,
        hUnit: 'px',
      });
    },
  });

  const temporaryStorageHandler = () => {
    const sendState = deleteIDproperty(state);
    temporarySurveyHandler.mutate({
      ...sendState,
      id: '',
      closingComment: `${closinTitle}|${closingComment}`,
      tempFl: 1,
    });
  };

  if (isLoading) {
    return (
      <SettingPage>
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
    <>
      <Setting
        setShowModal={setShowModal}
        closinTitle={closinTitle}
        closingComment={closingComment}
        temporaryStorageHandler={temporaryStorageHandler}
        setclosingComment={setclosingComment}
        setClosinTitle={setClosinTitle}
      />
      <Portal selector="#portal">
        {data.data < 500 ? (
          <ModalTemplate visibleState={showModal} setVisible={setShowModal} height={50}>
            <LackPointModal setVisible={setShowModal} point={data.data} />
          </ModalTemplate>
        ) : (
          <ModalTemplate visibleState={showModal} setVisible={setShowModal} height={25}>
            <SurveyUpLoadAlert
              state={state}
              setToastState={setToastState}
              setShowModal={setShowModal}
              setVisible={setShowModal}
              point={data.data}
              closinTitle={closinTitle}
              closingComment={closingComment}
            />
          </ModalTemplate>
        )}
      </Portal>
    </>
  );
};

export default SettingWrapper;

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
