import { render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import PeriodSettingWrapper from 'components/survey/setting/PeriodSettingWrapper';

describe('설문 진행 기간', () => {
  test("설문 제목에는 '설문의 진행 기간을 설정해주세요'라는 문구가 출력되어야 한다.", () => {
    render(
      <RecoilRoot>
        <PeriodSettingWrapper />
      </RecoilRoot>
    );
    const text = screen.getByText('설문의 진행 기간을 설정해주세요.');

    expect(text).toBeInTheDocument();
  });

  test('시작일이 있어야 한다.', () => {
    render(
      <RecoilRoot>
        <PeriodSettingWrapper />
      </RecoilRoot>
    );
    const text = screen.getByText('시작일');

    expect(text).toBeInTheDocument();
  });

  test('시작일과 종료일에는 기본적으로 오늘 날짜가 디폴트 값이어야 한다', () => {
    render(
      <RecoilRoot>
        <PeriodSettingWrapper />
        <div id="portal" />
      </RecoilRoot>
    );
    const startDate = screen.getByTestId('startDate').textContent;

    function getToday() {
      const date = new Date();
      const year = date.getFullYear();
      const month = `0 ${1 + date.getMonth()}`.slice(-2);
      const day = `0${date.getDate()}`.slice(-2);

      return `${year}.${month}.${day}`;
    }

    expect(startDate).toEqual(getToday());
  });
});
