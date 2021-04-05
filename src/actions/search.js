export function saveSearchState(data) {
  console.log(data);
  return {
    type: 'SAVE_SEARCH_STATE',
    payload: data,
  };
}