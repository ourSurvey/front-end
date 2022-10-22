import { render, screen } from '@testing-library/react';
import MySurvey from 'pages/mySurvey/index';

describe('나의 서베이', () => {
  test('나의 서베이 페이지의 헤더는 "나의 서베이"라는 문구가 출력되어야 한다.', () => {
    render(<MySurvey />);

    const heading = screen.getByRole('heading', {
      name: /나의 서베이/i,
    });
    expect(heading).toBeInTheDocument();
  });

  test('나의 서베이 페이지 안에는 "작성한 질문", "참여한 설문" 두개의 nav가 출력되어야 한다.', () => {
    render(<MySurvey />);

    const writedSurvey = screen.getByText('작성한 질문');
    const participatedSurvey = screen.getByText('참여한 설문');
    expect(writedSurvey).toBeInTheDocument();
    expect(participatedSurvey).toBeInTheDocument();
  });
});
