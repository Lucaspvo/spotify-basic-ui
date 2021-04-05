export function saveArtistsState(data) {
  return {
    type: 'SAVE_ARTISTS_STATE',
    payload: data,
  };
}