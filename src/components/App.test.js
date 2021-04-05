import { render, screen } from '../test-utils';
import App from './App';

describe('App', () => {
  it('should render the root app element', () => {
    render(<App />);
    const rootElement = screen.getByTestId("root-app-element");
    expect(rootElement).toBeInTheDocument();
  });

  it('should render child component top-nav', () => {
    render(<App />);
    const topNav = screen.getByTestId("top-nav");
    expect(topNav).toBeInTheDocument();
  });

  it('should render child component content', () => {
    render(<App />);
    const content = screen.getByTestId("content");
    expect(content).toBeInTheDocument();
  });
});
