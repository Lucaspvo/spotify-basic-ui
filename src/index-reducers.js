import { combineReducers } from 'redux';
import auth from './reducers/auth-reducer.js';
import navTitle from './reducers/nav-title-reducer.js';
import { connectRouter } from 'connected-react-router';

export default (history) => combineReducers({
  router: connectRouter(history),
  auth,
  navTitle,
})
