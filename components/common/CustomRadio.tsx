import styled from "@emotion/styled";
import { Common, Pretendard } from "styles/common";
interface IObject {
  key: string;
  value: any;
}

type Props = {
  items: IObject[];
  handleRadio: (e: null | "M" | "F" | string) => void;
};

const CustomRadio = ({ items, handleRadio }: Props) => {
  return (
    <RadioButtonContainer>
      {items.map((item) => {
        return (
          <Mylabel htmlFor={item.key} key={item.key}>
            <RadioInput
              id={item.key}
              type="radio"
              value={item.value || ""}
              name="radioBoxes"
              key={item.key}
              onChange={(e) => handleRadio(e.target.value)}
            />
            <FormCheckText>{item.key}</FormCheckText>
          </Mylabel>
        );
      })}
    </RadioButtonContainer>
  );
};

export default CustomRadio;

const RadioButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin-bottom: 30px;
  & label:not(:last-child) {
    margin-bottom: 20px;
  }
`;

const Mylabel = styled.label`
  & span {
  }
`;

const FormCheckText = styled.span`
  height: 46px;
  display: block;
  width: 100%;
  border: 1px solid ${Common.colors.GY300};
  ${Pretendard({ font: 1.4, weight: 400, color: Common.colors.GY900 })}
  line-height: 170%;
  border-radius: 10px;
  padding: 10px 15px;
  cursor: pointer;
`;

const RadioInput = styled.input`
  &:checked {
    display: none;
  }
  &:checked + ${FormCheckText} {
    background-color: ${Common.colors.BL50};
    border: 1px solid ${Common.colors.BL300};
    ${Pretendard({ font: 1.4, weight: 700, color: Common.colors.BL500 })}
    line-height: 170%;
  }
  display: none;
`;
