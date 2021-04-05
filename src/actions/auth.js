export function validAuthorization(data) {
  return {
    type: 'USER_AUTHORIZED',
    payload: data,
  };
}

export function logOut() {
  return {
    type: 'USER_LOG_OUT',
  };
}