/** @jsxImportSource @emotion/react */
import { useState, useEffect, memo } from 'react';
import CheckBox from 'components/common/CheckBox';
import TosItem from './TosItem';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Common, Pretendard } from 'styles/common';

interface ITos {
  title: string;
  isRequired: boolean;
  hasContent: boolean;
}

interface Iprops {
  setIsAllCheck: (isAllCheck: boolean) => void;
}
const TosContainer = ({ setIsAllCheck }: Iprops) => {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const termsAndConditions: ITos[] = [
    { title: '만 14세 이상입니다.', isRequired: true, hasContent: false },
    { title: '개인정보 수집 및 이용동의', isRequired: true, hasContent: true },
    { title: '서비스 이용약관 동의', isRequired: true, hasContent: true },
  ];

  //체크박스 핸들러
  const checkedItemHandler = (code: string, isChecked: boolean): void => {
    if (isChecked) {
      if ([...checkedItems, code].length === 3) {
        setCheckedItems([...checkedItems, code, '전체 동의합니다.']);
      } else {
        setCheckedItems([...checkedItems, code]);
      }
    } else if (!isChecked && checkedItems.find((one) => one === code)) {
      const filter = checkedItems.filter((one) => one !== code);
      const removeAllCheckData = filter.filter((item) => item !== '전체 동의합니다.');

      setCheckedItems([...removeAllCheckData]);
    }
  };

  //전체 체크 or 전체 체크 해제
  const onCheckAll = (checked: boolean) => {
    if (checked) {
      //전체 체크
      const checkedItemsArray: string[] = [];
      termsAndConditions.forEach((data) => checkedItemsArray.push(data.title));
      checkedItemsArray.push('전체 동의합니다.');
      setCheckedItems(checkedItemsArray);
    } else {
      //전체 해제
      setCheckedItems([]);
    }
  };

  useEffect(() => {
    if (checkedItems.length === 4) {
      setIsAllCheck(true);
    } else {
      setIsAllCheck(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedItems]);
  return (
    <div
      css={css`
        margin-bottom: 42.5px;
      `}
    >
      <Span>약관동의</Span>
      <CheckBox
        checkedItemHandler={checkedItemHandler}
        checkItems={checkedItems}
        data="전체 동의합니다."
        checked={false}
        onchange={(e) => onCheckAll(e.target.checked)}
        disabled={false}
      >
        <TosItem title="전체 동의합니다." isRequired={false} hasContent={false} />
      </CheckBox>
      {termsAndConditions.map((item, idx) => {
        return (
          <CheckBox
            key={idx}
            checkedItemHandler={checkedItemHandler}
            checkItems={checkedItems}
            data={item.title}
            checked={false}
            disabled={false}
          >
            <TosItem title={item.title} isRequired={item.isRequired} hasContent={item.hasContent} />
          </CheckBox>
        );
      })}
    </div>
  );
};

export default memo(TosContainer);

const Span = styled.div`
  ${Pretendard({ font: 1.2, weight: 700, color: Common.colors.GY700 })}
  margin-bottom: 8px
`;
