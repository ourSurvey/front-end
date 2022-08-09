import styled from "@emotion/styled";
import { Button } from "components/common/Button";
import CustomRadio from "components/common/CustomRadio";
import { Common, Pretendard } from "styles/common";
const SelectGengder = (props: any) => {
  const gender = [
    { key: "남자", value: "M" },
    { key: "여자", value: "F" },
    { key: "선택하지 않음", value: "" },
  ];

  return (
    <div>
      <h1>성별을 선택해주세요.</h1>
      <Description>빠른 설문조사를 위해 인구통계적 정보를 수집하고 있어요!</Description>
      <CustomRadio items={gender} handleRadio={props.onSelectHandler} />
      <Button isDisabled={false} btnText="다음" color={Common.colors.BL500} textColor="#fff" />
      <Pstyle>답변하지 않고 넘어가기</Pstyle>
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
