import React from 'react';
import styled from '@emotion/styled';
import { Common, Pretendard } from 'styles/common';
import { IQuestion } from 'types/survey';

interface IProps {
  name?: string;
  question: IQuestion;
  setQuestion: any;
  color: string;
  id: any;
}

type ColorProps = {
  mainColor: string;
};

const Toggle = ({ name, question, setQuestion, color, id }: IProps) => {
  const onToggleHanler = () => {
    setQuestion({
      ...question,
      essFl: question.essFl === 0 ? 1 : 0,
    });
  };

  return (
    <ToggleSwitch mainColor={color}>
      <span>{name}</span>
      <label htmlFor={`toggle-${id}`} className="toggle-label">
        <input
          className="toggle"
          type="checkbox"
          checked={Boolean(question.essFl)}
          onChange={onToggleHanler}
          id={`toggle-${id}`}
        />
        <div className="toggle-label-handle"></div>
      </label>
    </ToggleSwitch>
  );
};

export default Toggle;

const ToggleSwitch = styled.div<ColorProps>`
  display: flex;
  & span {
    margin-right: 2px;
    ${Pretendard({ font: 1.2, weight: 400, color: Common.colors.GY700 })}
    line-height: 150%;
  }

  .toggle {
    display: none;
    &:checked + div {
      border: ${(props) =>
        props.mainColor === 'pink' ? `1px solid ${Common.colors.PK500}` : `1px solid ${Common.colors.GR500}`};
    }
    &:checked + div:after {
      right: calc(100% - 35px);
    }
    &:checked + .toggle-label-handle::after {
      background-color: ${(props) => (props.mainColor === 'pink' ? Common.colors.PK500 : Common.colors.GR500)};
    }
  }

  .toggle .toggle-label {
    display: inline-block;
  }
  .toggle-label-handle {
    width: 30px;
    height: 18px;
    padding: 2.5px;
    border-radius: 20px;
    border: 1px solid ${Common.colors.GY300};
    background-color: white;
  }

  .toggle-label-handle::after {
    content: '';
    position: relative;
    right: 0;
    display: block;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background-color: ${Common.colors.GY200};
    transition: right 0.4s ease-in-out;
  }
`;
