import initial_state from './initial_states/sign-up-form';

function validateName(what, name) {
  let errors = [],
        names = name.split(' '),
        excessiveSpaces = false,
        invalidName = false;

  if(!name.trim().length) {
    errors.push(what + ' is required.');
  } else {
    for(let substr of names) {
      if(!substr.length || /( {2,})/.test(substr)) {
        if(!excessiveSpaces) {
          errors.push(what + ' contains excessive spaces.');
          excessiveSpaces = true;
        }
      } else if(!/^[a-zA-Z ]+$/.test(substr)) {
        if(!invalidName) {
          errors.push(what + ' is invalid.');
          invalidName = true;
        }
      }
    }
  }

  return errors;
}

function validateEmail(email) {
  let errors = [];

  if(!email.trim().length) {
    errors.push('Email is required.');
  } else if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
    errors.push('Email is invalid.');
  }

  return errors;
}

function validatePassword(password, passwordAgain) {
  let errors = [];

  if((!password.trim().length && passwordAgain.trim().length) || !password.trim().length) {
    errors.push('Password is required.');
  }

  return errors;
}

function validatePasswordAgain(password, passwordAgain) {
  let errors = [];

  if(password.trim().length) {
    if(!passwordAgain.trim().length) {
      errors.push('Enter your password again.');
    } else if(password != passwordAgain) {
      errors.push('Passwords do not match.');
    }
  }

  return errors;
}

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

export default function signUpForm(state = initial_state, action) {
  let newState;

  switch(action.type) {
    case 'CHANGE_FIRST_NAME':
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
          ...state.request,
          allow_submit: allowSubmit(newState)
        }
      }
    break;

    case 'CHANGE_MIDDLE_NAME':
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
          ...state.request,
          allow_submit: allowSubmit(newState)
        }
      }
    break;

    case 'CHANGE_SURNAME':
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
          ...state.request,
          allow_submit: allowSubmit(newState)
        }
      }
    break;

    case 'CHANGE_SURNAME':
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
          ...state.request,
          allow_submit: allowSubmit(newState)
        }
      }
    break;

    case 'CHANGE_EMAIL':
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
          ...state.request,
          allow_submit: allowSubmit(newState)
        }
      }
    break;

    case 'CHANGE_PASSWORD':
      newState = {
        ...state,
        password: {
          errors: validatePassword(action.value, state.password_again.value),
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
          ...state.request,
          allow_submit: allowSubmit(newState)
        }
      }
    break;

    case 'CHANGE_PASSWORD_AGAIN':
      newState = {
        ...state,
        password: {
          ...state.password,
          errors: validatePassword(state.password.value, action.value),
        },
        password_again: {
          errors: validatePasswordAgain(state.password.value, action.value),
          value: action.value
        }
      }

      return {
        ...newState,
        request: {
          ...state.request,
          allow_submit: allowSubmit(newState)
        }
      }
    break;

    case 'SEND_START':
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

    case 'SEND_FAILED':
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

    case 'SEND_SUCCESSFUL':

    break;

    case 'SEND_ERROR_CLEAR':
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