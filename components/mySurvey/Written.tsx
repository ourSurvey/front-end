import { useQueries } from 'react-query';
import { getMySurveies, isHaveSurveyTemp } from 'services/api/survey';
import SurveySkeleton from 'components/skeleton/SurveySkeleton';
import styled from '@emotion/styled';
import SurveyBox from './SurveyBox';
import useScrollHeight from 'hooks/useScrollHeight';

interface IMySurveyData {
  id: string;
  subject: string;
  startDate: string;
  endDate: string;
  tempFl: number;
  replyCount: number;
  status: number;
}

const Placeholder: React.FC = () => (
  <ItemContainer className="survey-items">
    <UlContainer>
      <SurveySkeleton width={100} height={15} />
    </UlContainer>
    <SurveySkeleton width={200} height={25} rounded />
    <Content></Content>
    <DateContainer>
      <SurveySkeleton width={120} height={14} rounded />
    </DateContainer>
    <UlContainer>
      <SurveySkeleton width={49} wUnit="%" height={36} />
      &nbsp;
      <SurveySkeleton width={49} wUnit="%" height={36} />
    </UlContainer>
  </ItemContainer>
);

const Buttons: React.FC = () => (
  <>
    <ButtonsContainer>
      <SurveySkeleton width={15} wUnit="%" height={26} rounded />
      &nbsp;
      <SurveySkeleton width={15} wUnit="%" height={26} rounded />
      &nbsp;
      <SurveySkeleton width={15} wUnit="%" height={26} rounded />
      &nbsp;
      <SurveySkeleton width={15} wUnit="%" height={26} rounded />
    </ButtonsContainer>
  </>
);

type Props = {};

const Written = (props: Props) => {
  const result = useQueries([
    { queryKey: ['temps'], queryFn: () => isHaveSurveyTemp(), suspense: true },
    { queryKey: ['mySurveies'], queryFn: () => getMySurveies(), suspense: true },
  ]);
  const Section = useScrollHeight({ id: 'wrttenSection' });
  console.log(result);

  if (result[0].isLoading || result[1].isLoading) {
    return (
      <SkeletonContainer>
        <Buttons />
        <Placeholder />
        <Placeholder />
        <Placeholder />
      </SkeletonContainer>
    );
  }

  return (
    <Section id="wrttenSection">
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
`;

const SkeletonContainer = styled.div`
  padding: 0 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ItemContainer = styled.div`
  padding: 15px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.16);
  border-radius: 14px;
  margin-bottom: 24px;
  width: 100%;
`;

const UlContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
  margin-top: 0px;
  padding: 0;
`;

const ButtonsContainer = styled(UlContainer)`
  width: 100%;
`;

const Content = styled.p`
  & span {
    margin-top: 5px;

    &:last-child {
      margin-bottom: 10px;
    }
  }
`;

const DateContainer = styled.div`
  margin-bottom: 10px;
`;
