import styled from '@emotion/styled';
import { Common, SpaceBetween } from 'styles/common';
import PartSpeechContainer from 'components/survey/template/PartSpeechContainer';
import { memo, useEffect, useState } from 'react';
import { sectionIdListAtom } from 'states/surveyIds';
import { useRecoilValue } from 'recoil';
import Link from 'next/link';
import { Button } from 'components/common/Button';
import Portal from 'components/common/Portal';
import MoreSideModal from 'components/modal/MoreSideModal';
import { disableNextButtonState } from 'states/survey';
import useScroll from 'hooks/useScroll';
interface IProps {
  scrollDetectHandler: (e: any) => void;
}

const WriteWrapper = ({ scrollDetectHandler }: IProps) => {
  const [visibleMore, setVisibleMore] = useState(false);
  const partIdList = useRecoilValue(sectionIdListAtom);
  const survey = useRecoilValue(disableNextButtonState);
  const { scrollPoint, moveScrollPoint } = useScroll();

  useEffect(() => {
    moveScrollPoint();
  }, [partIdList]);

  return (
    <>
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
        {scrollPoint}
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
              isDisabled={survey}
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
        <MoreSideModal visibleState={visibleMore} setVisible={setVisibleMore} />
      </Portal>
    </>
  );
};

export default memo(WriteWrapper);

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
