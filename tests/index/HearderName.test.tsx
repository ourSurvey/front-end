import React from "react";
import HeaderName from "components/HeaderName";
import { render, screen } from "@testing-library/react";

describe("헤더 테스트", () => {
  const testName: string = "회원가입";
  it("헤더에는 prop로 전달한 이름이 출력되어야 한다", () => {
    render(<HeaderName name="회원가입" hasBack={true} hasNext={true} />);
    const text = screen.getByText("회원가입");

    expect(text).toBeInTheDocument();
  });
});
