import { Common, Pretendard, SpaceBetween } from 'styles/common';
import styled from '@emotion/styled';

interface IProps {
  tempCount: number;
}

const TempAlert = ({ tempCount }: IProps) => {
  return (
    <TempAlertContainer>
      <span className="alim">임시 저장한 설문이 {tempCount}개 있어요!</span>{' '}
      <span className="write-next" role="button">
        이어서 작성하기
      </span>
    </TempAlertContainer>
  );
};

export default TempAlert;

const TempAlertContainer = styled.div`
  ${SpaceBetween()};
  background-color: ${Common.colors.GY50};
  border-radius: 90px;
  padding: 10px 20px;
  margin-bottom: 1rem;

  & .alim {
    ${Pretendard({ font: 1.2, color: '#000', weight: 700 })};
    line-height: 150%;
  }

  & .write-next {
    ${Pretendard({ font: 1.2, color: '#000', weight: 400 })};
    line-height: 150%;
  }
`;
