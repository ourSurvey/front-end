import type { NextPage } from "next";
import Link from "next/link";
import { Common, Pretendard } from "styles/common";
import styled from "@emotion/styled";
import OurSurveyLogo from "public/icon/our-survey.svg";
import { useMutation } from "react-query";
import { postAddition } from "services/api/auth";
import { useRecoilValue } from "recoil";
import { nullDeleteAdttionState } from "states/onBoard";
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
        <Button onClick={postAddtionDataHandler}>OUR SURVEY 시작하기</Button>
      </Link>
    </StartContainer>
  );
};

export default Start;

const StartContainer = styled.main`
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SvgContainer = styled.section`
  width: 90%;
  position: relative;
`;

const Button = styled.button`
  height: 50px;
  width: 90%;
  display: flex;
  justify-content: center;
  margin-top: 42px;
  align-items: center;
  padding: 10px 15px;
  outline: none;
  border: none;
  background-color: ${Common.colors.BL500};
  border-radius: 10px;
  ${Pretendard({ font: 1.4, weight: 700, color: "#fff" })}
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
