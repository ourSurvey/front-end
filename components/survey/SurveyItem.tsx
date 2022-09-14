import styled from "@emotion/styled";
import { Common, Pretendard } from "styles/common";
import { IContent } from "types/survey";
import Lighting from "public/icon/lighting.svg";
import Link from "next/link";
import { useRef } from "react";

const SurveyItem = (props: IContent) => {
  const { subject, content, openFl, minute, startDate, endDate, hashtagList, id } = props;

  const target = useRef(null); // 대상 ref

  const Button = styled.a`
    display: block;
    text-align: center;
    height: 36px;
    width: 100%;
    border-radius: 5px;
    font-family: "Pretendard";
    font-weight: 700;
    font-size: 0.75rem;
    font-style: normal;
    color: #fff;
    outline: 0;
    border: 0;

    padding-top: 9px;
    padding-bottom: 9px;
    background-color: ${Common.colors.BL500};
    margin-top: 10px;
    margin-bottom: ${hashtagList && hashtagList.length > 0 ? "10px" : "0"};
  `;
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
        <Link href={`/survey/${id}`} key={id}>
          <Button>설문 참여하기</Button>
        </Link>
        {hashtagList && hashtagList.length > 0 ? <Hashtag>{hashtagList?.map((item) => `#${item}`)}</Hashtag> : null}
      </>
    </ItemContainer>
  );
};

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
  margin-right: 5px;
  padding: 0 4px;
  display: flex;
  border-radius: 3px;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  background-color: ${Common.colors.GY50};
  ${Pretendard({ font: 1, weight: 400, color: "#000" })}
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
  & span {
    ${Pretendard({ font: 1, weight: 700, color: Common.colors.GY500 })}
  }
  ${Pretendard({ font: 1, weight: 400, color: Common.colors.GY500 })}
`;

const Hashtag = styled.span`
  width: 100%;
  display: -webkit-box;
  ${Pretendard({ font: 1, weight: 700, color: Common.colors.GY500 })};
  line-height: 150%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const FastChip = styled.li`
  display: flex;
  border-radius: 3px;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
  padding: 0 4px 0 0;
  background-color: ${Common.colors.GY700} !important;
  ${Pretendard({ font: 1, weight: 700, color: "#fff" })}
  line-height: 150%;
`;

export default SurveyItem;
