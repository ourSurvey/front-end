import styled from '@emotion/styled';
import SearchHeader from 'components/common/SearchHeader';
import { Common, Pretendard } from 'styles/common';
import SurveyContainer from 'components/survey/SurveyContainer';
import useScrollHeight from 'hooks/useScrollHeight';
const Index = () => {
  const Section = useScrollHeight({ id: 'section1' });

  return (
    <SurContainer>
      <SearchHeader name="실시간 서베이" hasBack={false} hasSearch={true} />
      <Title>
        실시간 설문에 참여하고
        <br />
        <span>300포인트</span> 받아가세요!
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
  & span {
    ${Pretendard({ font: 2, weight: 700, color: Common.colors.PK500 })}
  }
`;

const SurContainer = styled.main`
  position: relative;
  height: 100%;
`;
