import initial_state from './initial_states/sign-in-form';

import {
  validateEmail,
  validatePassword
} from '../helpers/Validator';

function mapErrors(state, errors) {
  return {
    email: {
      ...state.email,
      errors: errors.email? errors.email : []
    },
    password: {
      ...state.password,
      errors: errors.password? errors.password : []
    }
  }
}

function allowSubmit(newState) {
  return (!newState.email.errors.length &&
    !newState.password.errors.length &&
    !newState.request.sending) &&
    (newState.email.value.trim().length &&
    newState.password.value.trim().length)? true: false;
}

export default function signInForm(state = initial_state, action) {
  let newState;

  switch(action.type) {
    case 'SIGNIN_CHANGE_EMAIL':
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

    case 'SIGNIN_CHANGE_PASSWORD':
      newState = {
        ...state,
        password: {
          errors: validatePassword(action.value),
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

    case 'SIGNIN_SEND_START':
      return {
        ...state,
        request: {
          ...initial_state.request,
          allow_submit: state.request.allow_submit,
          sending: true
        }
      }
    break;

    case 'SIGNIN_SEND_SUCCESSFUL':
      return {
        ...initial_state,
      }
    break;

    case 'SIGNIN_SEND_FAILED':
      if(action.response) {
        newState = {
          ...state,
          ...mapErrors(state, action.response)
        }

        return {
          ...newState,
          request: {
            ...newState.request,
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

    case 'SIGNIN_SEND_ERROR_CLEAR':
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