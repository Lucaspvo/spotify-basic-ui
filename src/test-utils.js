import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { Provider } from 'react-redux'
import { Router } from "react-router-dom"

import configureStore, { history } from './configure-store.js';

function render(
  ui,
  {
    initialState = {},
    store = configureStore(initialState).store,
    setUpHistory = history,
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <Router history={setUpHistory}>
          {children}
        </Router>
      </Provider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'
// override render method
export { render }