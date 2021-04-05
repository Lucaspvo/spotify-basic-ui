import { combineReducers } from 'redux';
import auth from './reducers/auth-reducer.js';
import navTitle from './reducers/nav-title-reducer.js';
import search from './reducers/search-reducer.js';
import artists from './reducers/artists-reducer.js';
import artistAlbums from './reducers/artist-albums-reducer.js';
import { connectRouter } from 'connected-react-router';

const appReducer = (history) => combineReducers({
  router: connectRouter(history),
  auth,
  navTitle,
  search,
  artists,
  artistAlbums,
});

export default  history => (state, action) => {
  if (action.type === 'USER_LOG_OUT') {
    console.log('AQUIIIIIIIIIIIIIIIIIIIIIIIIIIIIII');
    state = {};
  }

  return appReducer(history)(state, action);
}