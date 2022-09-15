import styled from "@emotion/styled";
import { Common, Pretendard, AlignCenter } from "styles/common";

interface IProps {
  id: string; //id
  label: string; //라벨 명
  value: number; //input에 들어갈 값
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; //onChange event
  isSelected: boolean;
  radioSize: number; //라디오 크기
  radioCheckedSize: number; //라디오 체크되었을 때 크기
  checkedColor: string; //라디오 체크 되었을 때 색상
  borderColor: string; //라디오 테두리 색상
}

const ColorCustomRadio = ({ id, label, onChange, isSelected, value, radioSize, radioCheckedSize, checkedColor, borderColor }: IProps) => {
  const RadioButton = styled.div`
    margin: 16px 0;

    & input[type="radio"] {
      display: none;

      &:checked + label:before {
        border-color: ${borderColor};
      }
      &:checked + label:after {
        background-color: ${checkedColor};
      }
    }

    & label {
      display: inline-block;
      height: ${radioSize}px;
      position: relative;
      padding: 0 ${radioSize + 10}px;
      margin-bottom: 0;
      cursor: pointer;
      ${AlignCenter()};
      ${Pretendard({ font: 1.4, weight: 400, color: Common.colors.GY900 })};
      line-height: 150%;

      &:before,
      &:after {
        position: absolute;
        content: "";
        border-radius: 50%;
        transition: all 0.3s ease;
        transition-property: transform;
      }
      &:before {
        left: 0;
        top: 0;
        width: ${radioSize}px;
        height: ${radioSize}px;
        border: 1px solid ${borderColor};
      }

      &:after {
        top: ${radioSize / 2 - radioCheckedSize / 2 + 1}px;
        left: ${radioSize / 2 - radioCheckedSize / 2 + 1}px;
        width: ${radioCheckedSize}px;
        height: ${radioCheckedSize}px;
        background: ${Common.colors.GY200};
      }
    }
  `;

  return (
    <RadioButton>
      <input type="radio" value={value} id={id} onChange={onChange} checked={isSelected} />
      <label htmlFor={id}>{label}</label>
    </RadioButton>
  );
};

export default ColorCustomRadio;
