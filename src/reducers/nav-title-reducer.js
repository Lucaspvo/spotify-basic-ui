export default function navTitle(state, action) {
  if (state === undefined) {
    return 'Login';
  }

  if (action.type === 'CHANGE_NAV_TITLE') {
    return action.payload
  }

  return state;
}