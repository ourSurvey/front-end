import { useQuery } from 'react-query';
import { useState } from 'react';
import { getMySurveies } from 'services/api/survey';
import styled from '@emotion/styled';
import useScrollHeight from 'hooks/useScrollHeight';
import { MySurveySkeleton, Buttons } from 'components/skeleton/MySurveySkeletons';
import SelectboxWrapper from './SelectboxWrapper';
import SelectMySurveyOption from './SelectMySurveyOption';
import TempAlert from './TempAlert';

export interface IMySurveyData {
  id: string;
  subject: string;
  startDate: string;
  endDate: string;
  tempFl: number;
  replyCount: number;
  status: number;
}
//{ queryKey: ['temps'], queryFn: () => isHaveSurveyTemp(), suspense: true },
const Written = () => {
  const [status, setStatus] = useState<null | -1 | 0 | 1>(null);
  const result = useQuery(['mySurveies', status], () => getMySurveies(status), { staleTime: 5 * 60 * 1000 });
  const { targetElement, Section } = useScrollHeight();
  if (result.isLoading) {
    return (
      <SkeletonContainer>
        <Buttons />
        <MySurveySkeleton />
        <MySurveySkeleton />
        <MySurveySkeleton />
      </SkeletonContainer>
    );
  }
  const { willCount, ingCount, finCount, tempCount } = result.data.data;

  return (
    <>
      {tempCount > 0 && <TempAlert tempCount={tempCount} />}
      <SelectMySurveyOption
        status={status}
        setStatus={setStatus}
        willCount={willCount}
        ingCount={ingCount}
        finCount={finCount}
      />
      <Section ref={targetElement} id="wrttenSection">
        <SelectboxWrapper surveies={result.data.data.list} />
      </Section>
    </>
  );
};

export default Written;

const SkeletonContainer = styled.div`
  padding: 0 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
