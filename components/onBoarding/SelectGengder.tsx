import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Button } from "components/common/Button";
import CustomRadio from "components/common/CustomRadio";
import { Common, Pretendard } from "styles/common";
import { stepState } from "states/stepProgress";
import { addtionState } from "states/onBoard";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useRouter } from "next/router";

const SelectGengder = () => {
  const gender = [
    { key: "남자", value: "M" },
    { key: "여자", value: "F" },
    { key: "선택하지 않음", value: null },
  ];
  const setStepState = useSetRecoilState(stepState);
  const [additionState, setAdditionState] = useRecoilState(addtionState);
  const [genderState, setgenderState] = useState<any>(null);
  const router = useRouter();

  const nextPage = (): void => {
    setAdditionState({
      ...additionState,
      gender: genderState === "" ? null : genderState,
    });
    router.push("/onBoarding/birth");
  };

  const noAnswerNextPage = (): void => {
    setAdditionState({
      ...additionState,
      gender: null,
    });
    router.push("/onBoarding/birth");
  };

  useEffect(() => {
    setStepState(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>성별을 선택해주세요.</h1>
      <Description>빠른 설문조사를 위해 인구통계적 정보를 수집하고 있어요!</Description>
      <CustomRadio items={gender} handleRadio={setgenderState} />
      <Button isDisabled={genderState === null} btnText="다음" onClick={nextPage} color={Common.colors.BL500} textColor="#fff" />
      <Pstyle onClick={noAnswerNextPage}>답변하지 않고 넘어가기</Pstyle>
    </div>
  );
};

export default SelectGengder;

const Pstyle = styled.p`
  ${Pretendard({ font: 1.3, weight: 400, color: Common.colors.GY700 })}
  margin-top: 22px;
  margin-bottom: 28px;
  text-align: center;
`;
const Description = styled.p`
  margin-top: 9px;
  ${Pretendard({ font: 1.2, weight: 400, color: Common.colors.GY900 })}
  margin-bottom:30px;
`;
