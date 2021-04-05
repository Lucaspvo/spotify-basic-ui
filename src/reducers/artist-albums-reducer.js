export default function artistAlbums(state = null, action) {
  if (action.type === 'SAVE_ARTIST_ALBUMS_STATE') {
    return {
      artists: {
        ...action.payload,
      },
    }
  }

  return state;
}