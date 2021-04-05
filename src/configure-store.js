import { createBrowserHistory } from 'history'
import { applyMiddleware, createStore, compose } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import createRootReducer from './index-reducers'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export const history = createBrowserHistory();

export const persistConfig = {
  key: 'root',
  storage,
};

export default function configureStore(preloadedState = {}) {
  const store = createStore(
    persistReducer(persistConfig, createRootReducer(history)),
    preloadedState,
    compose(
      applyMiddleware(routerMiddleware(history)),
    ),
  );
  const persistor = persistStore(store);

  return { store, persistor };
}