import { render, screen } from '../../test-utils';
import TopNav from './top-nav.js';

const INITIAL_STATE = {
  auth: {
    token: 'JKHAGDKJHSGDgakjsdgkJHGSDKJGSAHD',
  },
  navTitle: 'Login',
};

describe('Tob Nav', () => {
  it('should render the root app element', () => {
    render(<TopNav />);
    const rootElement = screen.getByTestId("top-nav");
    expect(rootElement).toBeInTheDocument();
  });

  it('should match title name', () => {
    render(<TopNav />, { initialState: INITIAL_STATE });
    const title = screen.getByTestId("top-nav-title");
    expect(title).toHaveTextContent("Spotify Login");
  });

  it('should render logout icon', () => {
    render(<TopNav />, { initialState: INITIAL_STATE });
    const logOutIcon = screen.getByTestId("logout-icon");
    expect(logOutIcon).toBeInTheDocument();
  });
});

