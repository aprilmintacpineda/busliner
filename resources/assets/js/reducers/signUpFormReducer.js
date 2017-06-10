import initial_state from './initial_states/sign-up-form';

import {
  validateName,
  validatePasswords,
  validatePasswordAgain,
  validateEmail
} from '../helpers/Validator';

function allowSubmit(newState) {
  return (newState.first_name.value.trim().length &&
    newState.middle_name.value.trim().length &&
    newState.surname.value.trim().length &&
    newState.email.value.trim().length &&
    newState.password.value.trim().length &&
    newState.password_again.value.trim().length &&
    newState.password.value == newState.password_again.value &&
    !newState.request.sending) &&
    (!newState.first_name.errors.length &&
    !newState.middle_name.errors.length &&
    !newState.surname.errors.length &&
    !newState.email.errors.length &&
    !newState.password.errors.length &&
    !newState.password_again.errors.length) ? true : false;
}

function mapErrors(state, errors) {
  return {
    ...state,
    first_name: {
      ...state.first_name,
      errors: errors.first_name? errors.first_name : []
    },
    middle_name: {
      ...state.middle_name,
      errors: errors.middle_name? errors.middle_name : []
    },
    surname: {
      ...state.surname,
      errors: errors.surname? errors.surname : []
    },
    email: {
      ...state.email,
      errors: errors.email? errors.email : []
    },
    password: {
      ...state.password,
      errors: errors.password? errors.password : []
    },
    password_again: {
      ...state.password_again,
      errors: errors.password_again? errors.password_again : []
    }
  }
}

export default function signUpForm(state = initial_state, action) {
  let newState;

  switch(action.type) {
    case 'SIGNUP_CHANGE_FIRST_NAME':
      newState = {
        ...state,
        first_name: {
          errors: validateName('First name', action.value),
          value: action.value
        }
      }

      return {
        ...newState,
        request: {
          ...newState.request,
          allow_submit: allowSubmit(newState)
        }
      }
    break;

    case 'SIGNUP_CHANGE_MIDDLE_NAME':
      newState = {
        ...state,
        middle_name: {
          errors: validateName('Middle name', action.value),
          value: action.value
        }
      }

      return {
        ...newState,
        request: {
          ...newState.request,
          allow_submit: allowSubmit(newState)
        }
      }
    break;

    case 'SIGNUP_CHANGE_SURNAME':
      newState = {
        ...state,
        surname: {
          errors: validateName('Surname', action.value),
          value: action.value
        }
      }

      return {
        ...newState,
        request: {
          ...newState.request,
          allow_submit: allowSubmit(newState)
        }
      }
    break;

    case 'SIGNUP_CHANGE_SURNAME':
      newState = {
        ...state,
        surname: {
          errors: validateName('Surname', action.value),
          value: action.value
        }
      }

      return {
        ...newState,
        request: {
          ...newState.request,
          allow_submit: allowSubmit(newState)
        }
      }
    break;

    case 'SIGNUP_CHANGE_EMAIL':
      newState = {
        ...state,
        email: {
          errors: validateEmail(action.value),
          value: action.value
        }
      }

      return {
        ...newState,
        request: {
          ...newState.request,
          allow_submit: allowSubmit(newState)
        }
      }
    break;

    case 'SIGNUP_CHANGE_PASSWORD':
      newState = {
        ...state,
        password: {
          errors: validatePasswords(action.value, state.password_again.value),
          value: action.value
        },
        password_again: {
          ...state.password_again,
          errors: validatePasswordAgain(action.value, state.password_again.value)
        }
      }

      return {
        ...newState,
        request: {
          ...newState.request,
          allow_submit: allowSubmit(newState)
        }
      }
    break;

    case 'SIGNUP_CHANGE_PASSWORD_AGAIN':
      newState = {
        ...state,
        password: {
          ...state.password,
          errors: validatePasswords(state.password.value, action.value),
        },
        password_again: {
          errors: validatePasswordAgain(state.password.value, action.value),
          value: action.value
        }
      }

      return {
        ...newState,
        request: {
          ...newState.request,
          allow_submit: allowSubmit(newState)
        }
      }
    break;

    case 'SIGNUP_SEND_START':
      if(state.request.allow_submit && !state.request.sending) {
        return {
          ...state,
          request: {
            ...initial_state.request,
            sending: true,
            allow_submit: state.request.allow_submit
          }
        }
      }
    break;

    case 'SIGNUP_SEND_FAILED':
      if(action.response) {
        newState = {
          ...state,
          ...mapErrors(state, action.response)
        }

        return {
          ...newState,
          request: {
            ...newState.request,
            sending: false,
            allow_submit: allowSubmit(newState)
          }
        }
      }

      return {
        ...state,
        request: {
          ...state.request,
          sending: false,
          status: 'failed',
          error: action.message
        }
      }
    break;

    case 'SIGNUP_SEND_SUCCESSFUL':
      return {
        ...initial_state,
        request: {
          ...initial_state.request,
          status: 'successful'
        }
      }
    break;

    case 'SIGNUP_SEND_ERROR_CLEAR':
      return {
        ...state,
        request: {
          ...initial_state.request,
          allow_submit: state.request.allow_submit
        }
      }
    break;
  }

  return state;
}