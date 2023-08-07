import { useRef } from 'react';
import styled from '@emotion/styled';
import { Button } from 'components/common/Button';
import Lighting from 'public/icon/lighting.svg';
import { Common, Pretendard, AlignAndJustifyCenter } from 'styles/common';
import { type IContent } from 'types/survey';
import { SurveyItem } from './SurveyItems';

const SurveyListItem = (props: IContent) => {
  const { subject, content, openFl, minute, startDate, endDate, hashtagList, id } = props;

  const target = useRef(null); // 대상 ref
  return (
    <SurveyItem ref={target}>
      <SurveyItem.Labels>
        <>
          {minute <= 5 ? (
            <FastChip>
              <Lighting width="17" height="19" />
              예상 시간: {minute}분
            </FastChip>
          ) : (
            <LiStyle>예상 시간: {minute}분</LiStyle>
          )}
          {openFl === 1 ? <LiStyle>설문 결과 공개</LiStyle> : null}{' '}
        </>
      </SurveyItem.Labels>
      <SurveyItem.Subject>{subject}</SurveyItem.Subject>
      <SurveyItem.Contents>{content}</SurveyItem.Contents>
      <SurveyItem.Periods>
        <>
          <span>설문 기간 </span>
          {startDate} ~ {endDate}
        </>
      </SurveyItem.Periods>
      <SurveyItem.LinkButton key={id} url={`/survey/${id}`}>
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
      </SurveyItem.LinkButton>
      <SurveyItem.HashTags hashtagList={hashtagList}></SurveyItem.HashTags>
    </SurveyItem>
  );
};

export default SurveyListItem;

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

const FastChip = styled.li`
  ${AlignAndJustifyCenter()};
  border-radius: 3px;
  margin-right: 5px;
  padding: 0 4px 0 0;
  background-color: ${Common.colors.GY700} !important;
  ${Pretendard({ font: 1, weight: 700, color: '#fff' })}
  line-height: 150%;
`;
