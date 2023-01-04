import styled from '@emotion/styled';
import { Common, Pretendard, AlignAndJustifyCenter } from 'styles/common';
import { IContent } from 'types/survey';
import Lighting from 'public/icon/lighting.svg';
import Link from 'next/link';
import { useRef } from 'react';
import { Button } from 'components/common/Button';

interface IStyle {
  hashtagList: [] | null;
}

const SurveyItem = (props: IContent) => {
  const { subject, content, openFl, minute, startDate, endDate, hashtagList, id } = props;

  const target = useRef(null); // 대상 ref
  return (
    <ItemContainer ref={target}>
      <>
        <UlContainer>
          {minute <= 5 ? (
            <FastChip>
              <Lighting width="17" height="19" />
              예상 시간: {minute}분
            </FastChip>
          ) : (
            <LiStyle>예상 시간: {minute}분</LiStyle>
          )}
          {openFl === 1 ? <LiStyle>설문 결과 공개</LiStyle> : null}
        </UlContainer>
        <h1>{subject}</h1>
        <Content>{content}</Content>
        <DateContainer>
          <>
            <span>설문 기간 </span>
            {startDate} ~ {endDate}
          </>
        </DateContainer>
        <Link href={`/survey/${id}/summary`} key={id}>
          <a>
            <Button
              fontSize={1.2}
              fontWeight={700}
              textColor="#fff"
              color={Common.colors.BL500}
              isDisabled={false}
              btnText="설문 참여하기"
              height={36}
              hUnit="px"
              fontFamily="pretendard"
            />
          </a>
          {/* <Button hashtagList={hashtagList}>설문 참여하기</Button> */}
        </Link>
        {hashtagList && hashtagList.length > 0 ? (
          <Hashtag hashtagList={hashtagList}>{hashtagList?.map((item) => `#${item}`)}</Hashtag>
        ) : null}
      </>
    </ItemContainer>
  );
};

export default SurveyItem;

const ItemContainer = styled.div`
  padding: 15px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.16);
  border-radius: 14px;
  margin-bottom: 24px;

  width: 100%;
  z-index: 20;
  &:last-child {
    margin-bottom: 0;
  }
  & h1 {
    ${Pretendard({ font: 1.6, weight: 700, color: Common.colors.GY900 })}
    line-height: 150%;
  }
`;

const UlContainer = styled.ul`
  display: flex;
  margin-bottom: 10px;
  list-style-type: none;
  margin-top: 0px;
  padding: 0;
`;

const LiStyle = styled.li`
  ${AlignAndJustifyCenter()};
  margin-right: 5px;
  padding: 0 4px;
  border-radius: 3px;
  border-radius: 3px;
  background-color: ${Common.colors.GY50};
  ${Pretendard({ font: 1, weight: 400, color: '#000' })}
  line-height: 150%;
  &:last-child {
    margin-right: 0;
  }
`;

const Content = styled.p`
  ${Pretendard({ font: 1.2, weight: 400, color: Common.colors.GY700 })}
  line-height: 150%;

  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
`;

const DateContainer = styled.span`
  margin-bottom: 10px;
  display: block;
  & span {
    ${Pretendard({ font: 1, weight: 700, color: Common.colors.GY500 })}
  }
  ${Pretendard({ font: 1, weight: 400, color: Common.colors.GY500 })}
`;

const Hashtag = styled.span<IStyle>`
  width: 100%;
  display: -webkit-box;
  ${Pretendard({ font: 1, weight: 700, color: Common.colors.GY500 })};
  line-height: 150%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin-top: ${({ hashtagList }) => (hashtagList && hashtagList.length > 0 ? '10px' : '0')};
`;

const FastChip = styled.li`
  ${AlignAndJustifyCenter()};
  border-radius: 3px;
  margin-right: 5px;
  padding: 0 4px 0 0;
  background-color: ${Common.colors.GY700} !important;
  ${Pretendard({ font: 1, weight: 700, color: '#fff' })}
  line-height: 150%;
`;
