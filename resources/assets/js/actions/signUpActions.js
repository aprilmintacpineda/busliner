export function changeName(value) {
  return {
    type: 'CHANGE_FIRST_NAME',
    value
  }
}

export function changeMiddleName(value) {
  return {
    type: 'CHANGE_MIDDLE_NAME',
    value
  }
}

export function changeSurname(value) {
  return {
    type: 'CHANGE_SURNAME',
    value
  }
}

export function changeEmail(value) {
  return {
    type: 'CHANGE_EMAIL',
    value
  }
}

export function changePassword(value) {
  return {
    type: 'CHANGE_PASSWORD',
    value
  }
}

export function changePasswordAgain(value) {
  return {
    type: 'CHANGE_PASSWORD_AGAIN',
    value
  }
}

export function clearRequestError() {
  return {
    type: 'SEND_ERROR_CLEAR'
  }
}

export function send() {
  return {
    type: 'SEND_START'
  }
}