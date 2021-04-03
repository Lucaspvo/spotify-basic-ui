import { combineReducers } from 'redux';
import auth from './reducers/auth-reducer.js';

const navTitle = (state = 'Login', action) => {
  if (action.type === 'CHANGE_TITLE') {
    return action.payload;
  }

  return state;
};

export default combineReducers({
  auth,
  navTitle,
});
