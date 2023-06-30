import styled from '@emotion/styled';
import { Common } from 'styles/common';
import CreateSurveyHeader from 'components/survey/CreateSurveyHeader';
import React from 'react';
import SubLayout from 'components/SubLayout';

import { GetServerSideProps } from 'next';
import { withAuth } from 'utills/isLoggedIn';
import { useHeaderScroll } from 'hooks/useHeaderScroll';
import WriteWrapper from 'components/survey/WriteWrapper';

export const getServerSideProps: GetServerSideProps = withAuth(() => {
  return {
    props: {},
  };
});

export default function Index() {
  const { hide, scrollDetectHandler } = useHeaderScroll();

  return (
    <WriteContainer>
      <HeaderWrap className={!hide ? 'hide' : ''}>
        <CreateSurveyHeader hasUnderLine={true} name="질문을 작성해주세요." step="02" />
      </HeaderWrap>
      <WriteWrapper scrollDetectHandler={scrollDetectHandler} />
    </WriteContainer>
  );
}

Index.getLayout = function getLayout(page: React.ReactElement) {
  return <SubLayout>{page}</SubLayout>;
};

const WriteContainer = styled.main`
  position: relative;
  width: 100%;
  height: 100%;
  background-clip: padding-box;
  background-color: ${Common.colors.GY50};

  & .nav-up {
    position: absolute;
    top: -60.5px;
    transition: 1s;
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
