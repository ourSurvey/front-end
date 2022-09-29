import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchHeader from 'components/common/SearchHeader';

describe('헤더 테스트', () => {
  it('헤더에는 prop로 전달한 이름이 출력되어야 한다', () => {
    render(<SearchHeader name="회원가입" hasBack={true} hasSearch={true} />);
    const text = screen.getByText('회원가입');

    expect(text).toBeInTheDocument();
  });

  it('헤더에는 prop로 전달한 이름이 출력되어야 한다', () => {
    render(<SearchHeader name="로그인" hasBack={true} hasSearch={true} />);
    const text = screen.getByText('로그인');

    expect(text).toBeInTheDocument();
  });
});
