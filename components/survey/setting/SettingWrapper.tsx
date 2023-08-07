import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';
import Portal from 'components/common/Portal';
import LackPointModal from 'components/modal/LackPointModal';
import ModalTemplate from 'components/modal/ModalTemplate';
import SurveyUpLoadAlert from 'components/modal/SurveyUpLoadAlert';
import SurveySkeleton from 'components/skeleton/SurveySkeleton';
import { getMyPoint } from 'services/api/point';
import { toastState } from 'states/modal';
import { Common, Pretendard } from 'styles/common';
import Setting from './Setting';

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
  const { isLoading, data } = useQuery(['point'], async () => await getMyPoint(), {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

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
