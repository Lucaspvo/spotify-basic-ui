export default function search(state = null, action) {
  if (action.type === 'SAVE_SEARCH_STATE') {
    return {
      ...action.payload,
    }
  }

  return state;
}