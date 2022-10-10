import styled from '@emotion/styled';
import { Common, Pretendard, SpaceBetween } from 'styles/common';
import CreateSurveyHeader from 'components/survey/CreateSurveyHeader';
import PartSpeechContainer from 'components/survey/template/PartSpeechContainer';
import React, { useState } from 'react';
import SubLayout from 'components/SubLayout';
import { sectionIdListAtom } from 'states/surveyIds';
import { useRecoilValue } from 'recoil';
import Link from 'next/link';
import Portal from 'components/common/Portal';
import MoreSideModal from 'components/modal/MoreSideModal';
import { GetServerSideProps } from 'next';
import { withAuth } from 'utills/isLoggedIn';
import { useHeaderScroll } from 'hooks/useHeaderScroll';
import { Button } from 'components/common/Button';

interface IHeader {
  isHide: boolean;
}
export const getServerSideProps: GetServerSideProps = withAuth(() => {
  return {
    props: {},
  };
});

export default function Index() {
  const partIdList = useRecoilValue(sectionIdListAtom);
  const [visibleMore, setVisibleMore] = useState(false);
  const { hide, scrollDetectHandler } = useHeaderScroll();

  return (
    <WriteContainer>
      <HeaderWrap className={!hide ? 'hide' : ''}>
        <CreateSurveyHeader hasUnderLine={true} name="질문을 작성해주세요." step="02" />
      </HeaderWrap>
      <PartSectionContainer onScroll={scrollDetectHandler} id="section2">
        {partIdList.map((id, idx) => {
          return (
            <PartSpeechContainer
              partID={id}
              setVisibleMore={setVisibleMore}
              ListLength={partIdList.length}
              PartNum={idx}
              key={id}
            />
          );
        })}
      </PartSectionContainer>
      <BtnContainer>
        <Button
          isDisabled={false}
          fontFamily="pretendard"
          fontSize={1.2}
          fontWeight={400}
          textColor={Common.colors.GY900}
          color="transparent"
          btnText="임시저장"
          wUnit="%"
          width={20}
        />
        <Link href="/write/setting">
          <a>
            <Button
              className="next-btn"
              isDisabled={false}
              textColor="#fff"
              height={36}
              width={100}
              wUnit="%"
              hUnit="px"
              fontFamily="pretendard"
              fontSize={1.2}
              fontWeight={700}
              btnText="다음"
              color={Common.colors.BL500}
            />
          </a>
        </Link>
      </BtnContainer>
      <Portal selector="#portal">
        {visibleMore ? <MoreSideModal visibleState={visibleMore} setVisible={setVisibleMore} /> : null}
      </Portal>
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

const PartSectionContainer = styled.div`
  display: block;
  padding-top: 60.5px;
  height: calc(100% - 54px) !important;
  padding-bottom: 84px;

  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const BtnContainer = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0;
  height: 84px;
  background-color: #fff;
  padding: 14px 27px 0 20px;
  ${SpaceBetween()}
  border-top: 1px solid ${Common.colors.GY200};
  & button {
    height: 36px;
    line-height: 150%;
    border: 1px solid ${Common.colors.GY700};
    border-radius: 5px;
  }

  & a {
    min-width: 14%;
  }

  & .next-btn {
    outline: 0;
    border: 0;
    border-radius: 5px;
    line-height: 150%;
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
