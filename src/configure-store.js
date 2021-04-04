import { createBrowserHistory } from 'history'
import { applyMiddleware, createStore, compose } from 'redux'
import { routerMiddleware, connectRouter } from 'connected-react-router'
import createRootReducer from './index-reducers'

export const history = createBrowserHistory();

export default function configureStore(preloadedState = {}) {
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    compose(
      applyMiddleware(routerMiddleware(history)),
    ),
  );

  return store
}