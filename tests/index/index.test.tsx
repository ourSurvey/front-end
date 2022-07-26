import { render, screen } from '@testing-library/react';
import Home from '../../pages/index';

describe('Home', () => {
  it('renders a button', () => {
    const { container } = render(<Home />);

    const heading = screen.getByText('홈 페이지 입니다');

    expect(heading).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
