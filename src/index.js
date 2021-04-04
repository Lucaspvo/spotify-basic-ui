import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';

import { Provider } from 'react-redux';

import { ConnectedRouter } from 'connected-react-router/immutable'
import configureStore, { history } from './configure-store'

const store = configureStore({});

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
