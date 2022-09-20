import React from "react";
import { render, screen } from "@testing-library/react";
import PeriodSetting from "components/survey/setting/PeriodSetting";

describe("설문 진행 기간", () => {
  test("설문 제목에는 '설문의 진행 기간을 설정해주세요'라는 문구가 출력되어야 한다.", () => {
    render(<PeriodSetting />);
    const text = screen.getByText("설문의 진행 기간을 설정해주세요.");

    expect(text).toBeInTheDocument();
  });

  test("시작일이 있어야 한다.", () => {
    render(<PeriodSetting />);
    const text = screen.getByText("시작일");

    expect(text).toBeInTheDocument();
  });
});
