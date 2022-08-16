import styled from "@emotion/styled";
import SearchHeader from "components/common/SearchHeader";
import { Common, Pretendard } from "styles/common";
import SurveyContainer from "components/survey/SurveyContainer";
import { useEffect, useState } from "react";

const Index = () => {
  const [sectionHeight, setSectionHeight] = useState<number | undefined>(0);

  useEffect(() => {
    const height = document.getElementById("section1")?.getBoundingClientRect().top;
    setSectionHeight(height);
  }, []);

  const Section = styled.section`
    height: calc(100% - ${sectionHeight}px);
  `;

  return (
    <SurContainer>
      <SearchHeader name="실시간 서베이" hasBack={false} />
      <Title>
        실시간 설문에 참여하고
        <br />
        <span>N포인트</span> 받아가세요!
      </Title>

      <Section id="section1">
        <SurveyContainer />
      </Section>
    </SurContainer>
  );
};

export default Index;

const Title = styled.p`
  text-align: center;
  margin-bottom: 38px;
  margin-top: 0;
  ${Pretendard({ font: 2, weight: 700, color: Common.colors.GY900 })}
  line-height: 24px;
  letter-spacing: -0.03em;
  & span {
    ${Pretendard({ font: 2, weight: 700, color: Common.colors.PK500 })}
  }
`;

const SurContainer = styled.main`
  position: relative;
  height: 100%;
`;
