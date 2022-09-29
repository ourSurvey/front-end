import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Common, Pretendard } from 'styles/common';
import ColorCustomRadio from 'components/common/ColorCustomRadio';
const ShareResult = () => {
  const [share, setShare] = useState('1');

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShare(e.target.value);
  };
  return (
    <Share>
      <h1>응답자와 설문 결과를 공유하시겠어요?</h1>
      <span>공유를 원하는 응답자에 한해서 설문 결과를 공유할 수 있습니다.</span>
      <ColorCustomRadio
        radioSize={24}
        radioCheckedSize={10}
        checkedColor={Common.colors.BL500}
        borderColor={Common.colors.GY300}
        onChange={onChangeHandler}
        isSelected={share === '1'}
        id="1"
        label="공유"
        value={1}
      />
      <ColorCustomRadio
        radioSize={24}
        radioCheckedSize={10}
        checkedColor={Common.colors.BL500}
        borderColor={Common.colors.GY300}
        onChange={onChangeHandler}
        isSelected={share === '0'}
        id="2"
        label="공유하지 않음"
        value={0}
      />
    </Share>
  );
};

export default ShareResult;

const Share = styled.section`
  background-color: #fff;
  padding: 0 20px;
  padding-bottom: 32px;

  & h1 {
    padding-top: 32px;
  }
  & span {
    ${Pretendard({ font: 1.2, weight: 400, color: Common.colors.GY700 })}
    line-height: 150%;
  }
`;
