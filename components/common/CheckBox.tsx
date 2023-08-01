import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Common, Pretendard } from 'styles/common';
interface IProps {
  children: JSX.Element;
  checked: boolean;
  disabled?: boolean;
  data: string; // input에 데이터 담아놓기
  checkItems: string[];
  checkedItemHandler: (code: string, ischecked: boolean) => void;
  onchange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // 다른 체크박스에 사용시 사용하기 위함
  isHighlightCheckedText: boolean;
}

const CheckBox = ({
  checkedItemHandler,
  checkItems,
  data,
  children,
  checked,
  disabled = false,
  onchange,
  isHighlightCheckedText,
}: IProps) => {
  const defaultChecked = checked || false;
  const [isChecked, setIsChecked] = useState(defaultChecked);

  const onCheck = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    checkedItemHandler(target.value, target.checked);
    setIsChecked(target.checked);
  };

  useEffect(() => {
    if (checkItems.includes(data)) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [checkItems, data]);

  return (
    <CheckboxWrapper>
      <label key={data}>
        <input
          type="checkbox"
          value={data}
          checked={isChecked}
          onChange={
            onchange !== undefined
              ? onchange
              : (e) => {
                  onCheck(e);
                }
          }
          disabled={disabled}
        />
        {isHighlightCheckedText ? <Text className={isChecked ? 'is-checked' : ''}>{children}</Text> : children}
      </label>
    </CheckboxWrapper>
  );
};

const Text = styled.div`
  ${Pretendard({ font: 1.4, weight: 400, color: Common.colors.GY900 })}

  &.is-checked {
    color: ${Common.colors.BL500};
    font-weight: 700;
  }
`;

export default CheckBox;

const CheckboxWrapper = styled.div`
  & input[type='checkbox'] {
    -webkit-appearance: none;
    appearance: none;
    margin-right: 6px;
    margin-top: 6px;
    /* creating a custom design */
    width: 1.375rem;
    height: 1.375rem;
    border-radius: 0.375rem;
    background-image: url('/images/check.svg');
    background-size: 50% 50%;
    background-position: 50%;
    background-repeat: no-repeat;
    border: 1px solid #c2c5d0;
    outline: none;
    cursor: pointer;

    &:checked {
      background-image: url('/images/checkedCheck.svg');
      background-size: 50% 50%;
      background-position: 50%;
      background-repeat: no-repeat;
    }
  }
  & input[type='checkbox']:disabled {
    border-color: ${Common.colors.GY100};
    background-color: ${Common.colors.GY100};
  }
  & input[type='checkbox']:disabled + span {
    color: ${Common.colors.GY100};
  }
  & label {
    display: flex;
  }
`;
