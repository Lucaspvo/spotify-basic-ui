export default function auth(state = {}, action) {
  if (action.type === 'USER_AUTHORIZED') {
    return {
      ...state,
      token: action.payload.token,
      token_type: action.payload.token_type,
    }
  }

  return state;
}