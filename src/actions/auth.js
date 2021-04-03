export function validAuthorization(data) {
  return {
    type: 'USER_AUTHORIZED',
    payload: data,
  };
}