import styled from '@emotion/styled';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useMutation } from 'react-query';
import { useRecoilValue } from 'recoil';
import { Button } from 'components/common/Button';
import OurSurveyLogo from 'public/icon/our-survey.svg';
import { postAddition } from 'services/api/auth';
import { nullDeleteAdttionState } from 'states/onBoard';
import { Common, Pretendard, AlignAndJustifyCenter } from 'styles/common';
const Start: NextPage = () => {
  const additionState = useRecoilValue(nullDeleteAdttionState);

  const postEmailAuth = useMutation(postAddition, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (data) => {
      console.log(data);
    },
  });

  const postAddtionDataHandler = () => {
    postEmailAuth.mutate(additionState);
  };

  return (
    <StartContainer>
      <SvgContainer>
        <OurSurveyLogo />
        <Subject>
          <span>설문하는 사람들의</span>
          <br />
          <span>품앗이 공간</span>
        </Subject>
      </SvgContainer>
      <Link href="/">
        <Button
          onClick={postAddtionDataHandler}
          color={Common.colors.BL500}
          textColor="#fff"
          wUnit="%"
          isDisabled={false}
          height={50}
          width={90}
          fontFamily="pretendard"
          btnText="OUR SURVEY 시작하기"
        />
      </Link>
    </StartContainer>
  );
};

export default Start;

const StartContainer = styled.main`
  height: 70%;
  ${AlignAndJustifyCenter()}
  flex-direction: column;

  & button {
    margin-top: 42px;
    padding: 10px 15px;
  }
`;

const SvgContainer = styled.section`
  width: 90%;
  position: relative;
`;

const Subject = styled.p`
  position: absolute;
  top: 4%;
  right: 7%;
  margin: 0;
  & span {
    ${Pretendard({ font: 1.4, weight: 700, color: Common.colors.GY900 })}
    line-height: 150%;
  }
`;
