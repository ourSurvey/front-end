import SurveySkeleton from 'components/skeleton/SurveySkeleton';
import styled from '@emotion/styled';

const MySurveySkeleton: React.FC = () => (
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

export { MySurveySkeleton, Buttons };

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
