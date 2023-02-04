import { render, screen } from '@testing-library/react';
import SurveyBox from 'components/mySurvey/SurveyBox';

describe('나의 서베이 리스트 컴포넌트', () => {
  test('응답자가 있을 경우에는 "응답자 명" 이라는 문구가 출력되어야 한다."', () => {
    render(
      <SurveyBox
        startDate="2023.01.01"
        endDate="2023.01.31"
        subject="편의점 라면 소비 패턴 조사를 위한 설문1"
        replyCount={123}
      />
    );
    const replyText = screen.getByText('응답자 123명');

    expect(replyText).toBeInTheDocument();
  });

  test('응답자가 없을 경우에는 "아직 응답자가 없습니다." 이라는 문구가 출력되어야 한다."', () => {
    render(
      <SurveyBox
        startDate="2023.01.01"
        endDate="2023.01.31"
        subject="편의점 라면 소비 패턴 조사를 위한 설문2"
        replyCount={0}
      />
    );
    const replyText = screen.getByText('아직 응답자가 없습니다.');

    expect(replyText).toBeInTheDocument();
  });

  describe('예정일 경우', () => {
    test('노출되는 버튼이 없어야 한다.', () => {
      render(
        <SurveyBox
          startDate="2023.02.01"
          endDate="2023.02.10"
          subject="편의점 라면 소비 패턴 조사를 위한 설문3"
          replyCount={123}
        />
      );
      const status = screen.getByText('예정');
      const pullUpButton = screen.getByText('끌어올리기');
      const resultButton = screen.getByText('결과 보기');

      expect(status).toBeInTheDocument();
      expect(pullUpButton).not.toBeInTheDocument();
      expect(resultButton).not.toBeInTheDocument();
    });
  });

  describe('진행 중일 경우,', () => {
    test('리스트에는 진행중이라는 문구가 출력되어야 하고, 끌어올리기 버튼이 있어야 한다.', () => {
      render(
        <SurveyBox
          startDate="2023.01.01"
          endDate="2023.03.31"
          subject="편의점 라면 소비 패턴 조사를 위한 설문4"
          replyCount={123}
        />
      );

      const status = screen.getByText('진행 중');
      const pullUpButton = screen.getByText('끌어올리기');

      expect(status).toBeInTheDocument();
      expect(pullUpButton).toBeInTheDocument();
    });

    test('응답자가 0인 경우, 결과보기 버튼은 disable이어야 한다', () => {
      render(
        <SurveyBox
          startDate="2023.01.01"
          endDate="2023.03.31"
          subject="편의점 라면 소비 패턴 조사를 위한 설문5"
          replyCount={0}
        />
      );

      const resultButton = screen.getByText('결과 보기');

      expect(resultButton).toBeDisabled();
    });
  });

  describe('종료일 경우', () => {
    test('리스트에는 종료라는 문구가 출력되어야 하고, 끌어올리기 버튼이 없어야 한다.', () => {
      render(
        <SurveyBox
          startDate="2022.12.01"
          endDate="2023.01.27"
          subject="편의점 라면 소비 패턴 조사를 위한 설문6"
          replyCount={123}
        />
      );

      const status = screen.getByText('종료');
      const pullUpButton = screen.getByText('끌어올리기');
      expect(status).toBeInTheDocument();
      expect(pullUpButton).not.toBeInTheDocument();
    });
  });
});
