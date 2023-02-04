import { useQueries } from 'react-query';
import { getMySurveies, isHaveSurveyTemp } from 'services/api/survey';
import styled from '@emotion/styled';
import SurveyBox from './SurveyBox';
import useScrollHeight from 'hooks/useScrollHeight';
import { MySurveySkeleton, Buttons } from 'components/skeleton/MySurveySkeletons';

interface IMySurveyData {
  id: string;
  subject: string;
  startDate: string;
  endDate: string;
  tempFl: number;
  replyCount: number;
  status: number;
}

type Props = {};

const Written = (props: Props) => {
  const result = useQueries([
    { queryKey: ['temps'], queryFn: () => isHaveSurveyTemp(), suspense: true },
    { queryKey: ['mySurveies'], queryFn: () => getMySurveies(), suspense: true },
  ]);
  const { targetElement, Section } = useScrollHeight();

  if (result[0].isLoading || result[1].isLoading) {
    return (
      <SkeletonContainer>
        <Buttons />
        <MySurveySkeleton />
        <MySurveySkeleton />
        <MySurveySkeleton />
      </SkeletonContainer>
    );
  }

  return (
    <Section ref={targetElement} id="wrttenSection">
      <WrittenContainer className="written" role="tabpanel">
        {result[1].data.data.list.map((item: IMySurveyData) => {
          return (
            <SurveyBox
              key={item.id}
              startDate={item.startDate}
              endDate={item.endDate}
              subject={item.subject}
              replyCount={item.replyCount}
            />
          );
        })}
      </WrittenContainer>
    </Section>
  );
};

export default Written;

const WrittenContainer = styled.article`
  padding: 12px 5px 5px 5px;
  overflow-y: scroll;
  height: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
  & .survey-box:not(:last-of-type) {
    margin-bottom: 2rem;
  }

  & .survey-box:last-of-type {
    margin-bottom: 30px;
  }
`;

const SkeletonContainer = styled.div`
  padding: 0 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
