import React from "react";
import styled from "@emotion/styled";
import { Common, Pretendard } from "styles/common";
import { Button } from "components/common/Button";
type Props = {};

const SurveyItem = (props: Props) => {
  return (
    <ItemContainer>
      <UlContainer>
        <li>예상 시간: 8분</li>
        <li>설문 결과 공개</li>
      </UlContainer>
      <h1>편의점 라면 소비 패턴 조사를 위한 설문</h1>
      <Content>
        편돌이 편순이의 많은 참여 부탁드립니다! 안녕하세요 저희는안녕asdawdadasdWAafsg하세요 저희는 gs25 대학생
        홍argahㅁㅈㄱ허ㅗ묻기하ㅓㅗㅜㄷㅁ히ㅏㅓ도규ㅝㅚ보대사 지편순
      </Content>
      <DateContainer>
        <span>설문 기간 </span>2022.00.00~2022.00.00
      </DateContainer>
      <Button color={Common.colors.BL500} textColor="#fff" btnText="설문 참여하기" isDisabled={false} />
      <Hashtag>#20대 #30대 #자취생 #편의점 #라면 #컵라면 #gs25 #20대 #30대 #20대 #30대 #20대 #30대</Hashtag>
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
    letter-spacing: -0.03em;
  }
  & button {
    margin: 10px 0;
  }
`;

const UlContainer = styled.ul`
  display: flex;
  margin-bottom: 10px;
  list-style-type: none;
  margin-top: 0px;
  padding: 0;
  & li {
    margin-right: 5px;
    padding: 2px 4px;
    background-color: ${Common.colors.GY50};
    ${Pretendard({ font: 1, weight: 400, color: "#000" })}
    line-height: 150%;
    &:last-child {
      margin-right: 0;
    }
  }
`;

const Content = styled.p`
  ${Pretendard({ font: 1.2, weight: 400, color: Common.colors.GY700 })}
  line-height: 150%;
  letter-spacing: -0.03em;
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
  letter-spacing: -0.03em;
`;

export default SurveyItem;
