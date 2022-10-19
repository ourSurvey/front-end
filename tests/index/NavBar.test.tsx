import { render, renderHook, screen } from '@testing-library/react';
import NavBar from 'components/common/NavBar';
import { useRouter } from 'next/router';

jest.mock('next/router', () => require('next-router-mock'));
// or this:
jest.mock('next/dist/client/router', () => require('next-router-mock'));

describe('네브바 테스트', () => {
  test('네브바에는 홈, 서베이, 나의 서베이, 더보기가 있어야 한다.', () => {
    render(<NavBar />);
    const { result } = renderHook(() => useRouter());
    console.log(result);

    const home = screen.getByText('홈');
    const survey = screen.getByText('서베이');
    const mySurvey = screen.getByText('나의 서베이');
    const more = screen.getByText('더보기');
    expect(home).toBeInTheDocument();
    expect(survey).toBeInTheDocument();
    expect(mySurvey).toBeInTheDocument();
    expect(more).toBeInTheDocument();
  });
});
