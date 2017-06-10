export function changeEmail(value) {
  return {
    type: 'SIGNIN_CHANGE_EMAIL',
    value
  }
}

export function changePassword(value) {
  return {
    type: 'SIGNIN_CHANGE_PASSWORD',
    value
  }
}

export function clearRequestError() {
  return {
    type: 'SIGNIN_SEND_ERROR_CLEAR'
  }
}

export function send() {
  return {
    type: 'SIGNIN_SEND_START'
  }
}