import { render, screen } from "@testing-library/react";
import Home from "../../pages/index";

describe("Home", () => {
  it("renders a heading", () => {
    const { container } = render(<Home />);

    const heading = screen.getByRole("heading", {
      name: /welcome to next\.js!/i,
    });

    expect(heading).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it("renders a button", () => {
    const { container } = render(<Home />);

    const heading = screen.getByText("다음");

    expect(heading).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });
});
