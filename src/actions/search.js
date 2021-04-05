export function saveSearchState(data) {
  return {
    type: 'SAVE_SEARCH_STATE',
    payload: data,
  };
}