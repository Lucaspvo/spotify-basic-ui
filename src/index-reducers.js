import { combineReducers } from 'redux';
import auth from './reducers/auth-reducer.js';
import { connectRouter } from 'connected-react-router';

const navTitle = (state = 'Login', action) => {
  if (action.type === 'CHANGE_TITLE') {
    return action.payload;
  }

  return state;
};

export default (history) => combineReducers({
  router: connectRouter(history),
  auth,
  navTitle,
})
