import { memo } from 'react';
import styled from '@emotion/styled';
import { useMutation } from 'react-query';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { Button } from 'components/common/Button';
import CreateSurveyHeader from 'components/survey/CreateSurveyHeader';
import AddTag from 'components/survey/setting/AddTag';
import CommentRespondent from 'components/survey/setting/CommentRespondent';
import PeriodSettingWrapper from 'components/survey/setting/PeriodSettingWrapper';
import ShareResult from 'components/survey/setting/ShareResult';
import TImeTaken from 'components/survey/setting/TImeTaken';
import { useHeaderScroll } from 'hooks/useHeaderScroll';
import { createSurvey } from 'services/api/survey';
import { toastState } from 'states/modal';
import { surveySelector } from 'states/survey';
import { Common, Pretendard, SpaceBetween } from 'styles/common';
import { deleteIDproperty } from 'utills/deleteIdProperty';

interface IProps {
  setShowModal: (bool: boolean) => void;
  closinTitle: string;
  setClosinTitle: (text: string) => void;
  closingComment: string;
  setclosingComment: (text: string) => void;
}

const Setting = ({ setShowModal, closinTitle, setClosinTitle, setclosingComment, closingComment }: IProps) => {
  const { hide, scrollDetectHandler } = useHeaderScroll();
  const setToastState = useSetRecoilState(toastState);
  const state = useRecoilValue(surveySelector);
  const temporarySurveyHandler = useMutation(createSurvey, {
    onSuccess: (data) => {
      if (data.status === 200) {
        setToastState({
          text: '임시저장 되었습니다.',
          toastType: 'success',
          visible: true,
          marginPosition: 55,
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
            onClick={() => {
              setShowModal(true);
            }}
          />
        </BtnContainer>
      </SettingItemContainer>
    </SettingPage>
  );
};

export default memo(Setting);

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
