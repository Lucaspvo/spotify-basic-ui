import { render, screen } from '../../test-utils';
import Content from './content.js';
import { createMemoryHistory } from 'history';

const INITIAL_STATE = {
  auth: {
    token: 'JKHAGDKJHSGDgakjsdgkJHGSDKJGSAHD',
  },
  navTitle: 'Login',
};

describe('Content', () => {
  it('should render the login page', () => {
    const history = createMemoryHistory();
    history.push('/login');

    render(<Content />, { setUpHistory: history });
    const loginComponent = screen.getByTestId("login");
    expect(loginComponent).toBeInTheDocument();
  });

  it('should render the search page', () => {
    const history = createMemoryHistory();
    history.push('/search/artists');

    render(<Content />, { initialState: INITIAL_STATE, setUpHistory: history });
    const searchComponent = screen.getByTestId("search-artists");
    expect(searchComponent).toBeInTheDocument();
  });

  it('should render the search page redirected from auth', () => {
    delete window.location;
    window.location = {
      hash: `#access_token=KAHskhSKHKAJHKAshkjASHJKas&token_type=Bearer&state=${process.env.REACT_APP_STATE}`,
    };

    const history = createMemoryHistory();
    history.push('/auth');

    render(<Content />, { initialState: { auth: {} }, setUpHistory: history });
    const searchComponent = screen.getByTestId("search-artists");
    expect(searchComponent).toBeInTheDocument();
  });

  it('should render the login page when logged out from home page', () => {
    const history = createMemoryHistory();
    history.push('/');

    render(<Content />, { setUpHistory: history });
    const loginComponent = screen.getByTestId("login");
    expect(loginComponent).toBeInTheDocument();
  });

  it('should render the search artists page when logged in from home page', () => {
    const history = createMemoryHistory();
    history.push('/');

    render(<Content />, { initialState: INITIAL_STATE, setUpHistory: history });
    const searchComponent = screen.getByTestId("search-artists");
    expect(searchComponent).toBeInTheDocument();
  });
});

