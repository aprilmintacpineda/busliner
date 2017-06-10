export function changeName(value) {
  return {
    type: 'SIGNUP_CHANGE_FIRST_NAME',
    value
  }
}

export function changeMiddleName(value) {
  return {
    type: 'SIGNUP_CHANGE_MIDDLE_NAME',
    value
  }
}

export function changeSurname(value) {
  return {
    type: 'SIGNUP_CHANGE_SURNAME',
    value
  }
}

export function changeEmail(value) {
  return {
    type: 'SIGNUP_CHANGE_EMAIL',
    value
  }
}

export function changePassword(value) {
  return {
    type: 'SIGNUP_CHANGE_PASSWORD',
    value
  }
}

export function changePasswordAgain(value) {
  return {
    type: 'SIGNUP_CHANGE_PASSWORD_AGAIN',
    value
  }
}

export function clearRequestError() {
  return {
    type: 'SIGNUP_SEND_ERROR_CLEAR'
  }
}

export function send() {
  return {
    type: 'SIGNUP_SEND_START'
  }
}