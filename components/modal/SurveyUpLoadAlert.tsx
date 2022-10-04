import styled from '@emotion/styled';
import { useQuery } from 'react-query';
import { getMyPoint } from 'services/api/point';
import TokenProvider from 'services/TokenProvider';
import { Pretendard, Common, SpaceBetween, AlignAndJustifyCenter } from 'styles/common';
import Coin from 'public/icon/gold-coin.svg';
type Props = {
  setVisible: (bool: boolean) => void;
  upload: () => void;
};

const SurveyUpLoadAlert = ({ setVisible, upload }: Props) => {
  const { isLoading, data } = useQuery(['point'], () => getMyPoint(), {
    refetchOnWindowFocus: false,
    staleTime: 5 * 1000 * 60,
  });

  return (
    <Confirm>
      <h1>설문을 업로드하시겠어요?</h1>
      <Flex>
        <Coin />
        <strong>500포인트</strong>가 사용돼요.
      </Flex>
      <Container>
        <CurrentPoint>현재 포인트 : {isLoading ? 0 : data.data}P</CurrentPoint>
      </Container>
      <div className="btn-container">
        <button onClick={() => setVisible(false)}>취소</button>
        <button className="del" onClick={upload}>
          업로드
        </button>
      </div>
    </Confirm>
  );
};

export default SurveyUpLoadAlert;

const Confirm = styled.div`
  ${SpaceBetween()}
  height: 100%;
  flex-direction: column;

  .btn-container {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }

  & h1 {
    display: inline-block;
    ${Pretendard({ weight: 700, font: 1.6, color: Common.colors.GY900 })};
    text-align: center;
  }

  & button {
    width: 100px;
    ${Pretendard({ weight: 400, font: 1.2, color: Common.colors.GY900 })};
    outline: none;
    background-color: #fff;
    border: 1px solid ${Common.colors.GY900};
    border-radius: 5px;
    &:first-of-type {
      margin-right: 10px;
    }
  }
  & .del {
    ${Pretendard({ weight: 700, font: 1.2, color: Common.colors.BL500 })};
    border: 1px solid ${Common.colors.BL500};
  }
`;

const CurrentPoint = styled.span`
  padding: 4px 10px;
  background-color: ${Common.colors.GY50};
  border-radius: 110px;
  ${Pretendard({ weight: 700, font: 1, color: Common.colors.GY700 })};
  line-height: 150%;
`;

const Flex = styled.div`
  ${AlignAndJustifyCenter()}
  ${Pretendard({ weight: 400, font: 1.3, color: '#333' })};
  line-height: 150%;

  & strong {
    ${Pretendard({ weight: 700, font: 1.3, color: '#333' })};
  }

  & svg {
    margin-right: 4px;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
`;
