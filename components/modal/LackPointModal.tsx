import styled from '@emotion/styled';
import { useQuery } from 'react-query';
import { getMyPoint } from 'services/api/point';
import TokenProvider from 'services/TokenProvider';
import { Pretendard, Common, SpaceBetween, AlignAndJustifyCenter, Roboto } from 'styles/common';
import Coin from 'public/icon/gold-coin.svg';
type Props = {
  setVisible: (bool: boolean) => void;
  upload: () => void;
};

const LackPointModal = ({ setVisible, upload }: Props) => {
  const { isLoading, data } = useQuery(['point'], () => getMyPoint(), {
    refetchOnWindowFocus: false,
    staleTime: 5 * 1000 * 60,
  });

  if (isLoading) {
    return <div>...로딩중</div>;
  }

  return (
    <Confirm>
      <h1>포인트가 부족합니다</h1>
      <Flex>
        설문을 업로드 하려면
        <Coin />
        <strong>{500 - data.data}포인트</strong>&nbsp;더 필요해요.
      </Flex>
      <Container>
        <CurrentPoint>현재 포인트 : {isLoading ? 0 : data.data}P</CurrentPoint>
      </Container>
      <SelectBox>
        <h2>이렇게 포인트를 얻을 수 있어요!</h2>
        <span>작성한 설문은 잠시 임시저장 해두고,</span>
        <Button css={{ marginBottom: '12px' }}>
          광고보기 &nbsp;&nbsp;|&nbsp;&nbsp; <Coin /> <span className="point">80P</span>
        </Button>
        <Button>
          다른 설문 참여하기&nbsp;&nbsp; |&nbsp;&nbsp; <Coin /> <span className="point">300P</span>
        </Button>
      </SelectBox>
      <span className="cancel" onClick={() => setVisible(false)}>
        취소
      </span>
    </Confirm>
  );
};

export default LackPointModal;

const Confirm = styled.div`
  ${SpaceBetween()}

  height: 100%;
  flex-direction: column;

  & h1 {
    display: inline-block;
    ${Pretendard({ weight: 700, font: 1.8, color: Common.colors.alert500 })};
    line-height: 150%;
    text-align: center;
  }

  & .cancel {
    display: block;
    text-align: center;
    ${Roboto({ weight: 400, font: 1.2, color: Common.colors.GY700 })};
    line-height: 150%;
    text-decoration: underline;
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
  ${Pretendard({ weight: 400, font: 1.2, color: Common.colors.GY900 })};
  line-height: 150%;

  & strong {
    ${Pretendard({ weight: 700, font: 1.2, color: Common.colors.alert500 })};
    line-height: 150%;
  }

  & svg {
    margin-right: 4px;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const SelectBox = styled.div`
  height: 50%;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #267cdd;
  border-radius: 14px;
  padding: 20px 24px 24px;

  & h2 {
    ${Roboto({ weight: 700, font: 1.2, color: '#fff' })};
    line-height: 150%;
    text-align: center;
  }

  & span {
    display: block;
    text-align: center;
    ${Pretendard({ weight: 400, font: 1, color: '#fff' })};
    line-height: 150%;
    margin-bottom: 14px;
  }
`;

const Button = styled.div`
  ${AlignAndJustifyCenter()};

  height: 36px;
  background: #ffffff;
  border: 1px solid ${Common.colors.BL500};
  border-radius: 5px;
  ${Pretendard({ weight: 400, font: 1.2, color: Common.colors.GY900 })};
  line-height: 150%;

  & .point {
    ${AlignAndJustifyCenter()};
    display: inline;
    ${Pretendard({ weight: 700, font: 1.2, color: Common.colors.BL500 })};
    margin: 0;
  }

  & svg {
    margin: 0 4px;
  }
`;
