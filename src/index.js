import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';

import { Provider } from 'react-redux';

import { ConnectedRouter } from 'connected-react-router/immutable'
import configureStore, { history } from './configure-store'

import { PersistGate } from 'redux-persist/integration/react'

const { store, persistor } = configureStore({});

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <PersistGate loading={null} persistor={persistor}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </PersistGate>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
