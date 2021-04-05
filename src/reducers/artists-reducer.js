export default function artists(state = null, action) {
  if (action.type === 'SAVE_ARTISTS_STATE') {
    return {
      artists: {
        ...state,
        ...action.payload,
      },
    }
  }

  return state;
}