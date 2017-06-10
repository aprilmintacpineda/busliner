import initial_state from '../../reducers/initial_states/sign-up-form';
import subject from '../../reducers/signUpFormReducer';
import { expect } from 'chai';

describe('reducers/signUpFormReducer', () => {
  it('has initial state', () => {
    expect(subject(undefined, {
      type: 'INIT'
    })).to.deep.equal(initial_state);
  });

  it('handles SIGNUP_CHANGE_FIRST_NAME with error checking', () => {
    expect(subject(initial_state, {
      type: 'SIGNUP_CHANGE_FIRST_NAME',
      value: ''
    })).to.deep.equal({
      ...initial_state,
      first_name: {
        errors: ['First name is required.'],
        value: ''
      }
    });

    expect(subject(initial_state, {
      type: 'SIGNUP_CHANGE_FIRST_NAME',
      value: 'april-'
    })).to.deep.equal({
      ...initial_state,
      first_name: {
        errors: ['First name is invalid.'],
        value: 'april-'
      }
    });
  });

  it('handles SIGNUP_CHANGE_MIDDLE_NAME with error checking', () => {
    expect(subject(initial_state, {
      type: 'SIGNUP_CHANGE_MIDDLE_NAME',
      value: ''
    })).to.deep.equal({
      ...initial_state,
      middle_name: {
        errors: ['Middle name is required.'],
        value: ''
      }
    });

    expect(subject(initial_state, {
      type: 'SIGNUP_CHANGE_MIDDLE_NAME',
      value: 'april-'
    })).to.deep.equal({
      ...initial_state,
      middle_name: {
        errors: ['Middle name is invalid.'],
        value: 'april-'
      }
    });
  });

  it('handles SIGNUP_CHANGE_SURNAME with error checking', () => {
    expect(subject(initial_state, {
      type: 'SIGNUP_CHANGE_SURNAME',
      value: ''
    })).to.deep.equal({
      ...initial_state,
      surname: {
        errors: ['Surname is required.'],
        value: ''
      }
    });

    expect(subject(initial_state, {
      type: 'SIGNUP_CHANGE_SURNAME',
      value: 'april-'
    })).to.deep.equal({
      ...initial_state,
      surname: {
        errors: ['Surname is invalid.'],
        value: 'april-'
      }
    });
  });

  it('handles SIGNUP_CHANGE_EMAIL with error checking', () => {
    expect(subject(initial_state, {
      type: 'SIGNUP_CHANGE_EMAIL',
      value: ''
    })).to.deep.equal({
      ...initial_state,
      email: {
        errors: ['Email is required.'],
        value: ''
      }
    });

    expect(subject(initial_state, {
      type: 'SIGNUP_CHANGE_EMAIL',
      value: 'april-'
    })).to.deep.equal({
      ...initial_state,
      email: {
        errors: ['Email is invalid.'],
        value: 'april-'
      }
    });
  });

  it('handles SIGNUP_CHANGE_PASSWORD with error checking', () => {
    expect(subject(initial_state, {
      type: 'SIGNUP_CHANGE_PASSWORD',
      value: ''
    })).to.deep.equal({
      ...initial_state,
      password: {
        errors: ['Password is required.'],
        value: ''
      }
    });

    expect(subject(initial_state, {
      type: 'SIGNUP_CHANGE_PASSWORD',
      value: 'Blah Blah'
    })).to.deep.equal({
      ...initial_state,
      password: {
        ...initial_state.password,
        value: 'Blah Blah'
      },
      password_again: {
        errors: ['Enter your password again.'],
        value: ''
      }
    });

    expect(subject({
      ...initial_state,
      password_again: {
        ...initial_state.password_again.errors,
        value: 'asdasd'
      }
    }, {
      type: 'SIGNUP_CHANGE_PASSWORD',
      value: 'Blah Blah'
    })).to.deep.equal({
      ...initial_state,
      password: {
        ...initial_state.password,
        value: 'Blah Blah'
      },
      password_again: {
        errors: ['Passwords do not match.'],
        value: 'asdasd'
      }
    });
  });

  it('handles SIGNUP_CHANGE_PASSWORD_AGAIN with error checking', () => {
    expect(subject({
      ...initial_state,
      password: {
        ...initial_state.password,
        value: 'asdasd'
      },
      password_again: {
        ...initial_state.password_again,
        value: 'a'
      }
    }, {
      type: 'SIGNUP_CHANGE_PASSWORD_AGAIN',
      value: 'a'
    })).to.deep.equal({
      ...initial_state,
      password: {
        ...initial_state.password,
        value: 'asdasd'
      },
      password_again: {
        errors: ['Passwords do not match.'],
        value: 'a'
      }
    });
  });

  it('handles SIGNUP_SEND_START with error checking', () => {
    expect(subject({
      ...initial_state,
      request: {
        ...initial_state.request,
        allow_submit: true
      }
    }, {
      type: 'SIGNUP_SEND_START'
    })).to.deep.equal({
      ...initial_state,
      request: {
        ...initial_state.request,
        allow_submit: true,
        sending: true
      }
    });
  });

  it('handles SIGNUP_SEND_FAILED', () => {
    expect(subject({
      ...initial_state,
      request: {
        sending: true,
        status: null,
        error: null,
        allow_submit: true
      }
    }, {
      type: 'SIGNUP_SEND_FAILED',
      message: '405 : Method Not Allowed'
    })).to.deep.equal({
      ...initial_state,
      request: {
        ...initial_state.request,
        sending: false,
        status: 'failed',
        error: '405 : Method Not Allowed',
        allow_submit: true
      }
    });

    expect(subject({
      ...initial_state,
      request: {
        ...initial_state.request,
        sending: true
      }
    }, {
      type: 'SIGNUP_SEND_FAILED',
      response: {
        first_name: ['First name is required.'],
        middle_name: ['Middle name is required.'],
        surname: ['Surname is required.'],
        email: ['Email is required.']
      }
    })).to.deep.equal({
      ...initial_state,
      first_name: {
        ...initial_state.first_name,
        errors: ['First name is required.']
      },
      middle_name: {
        ...initial_state.middle_name,
        errors: ['Middle name is required.']
      },
      surname: {
        ...initial_state.surname,
        errors: ['Surname is required.'],
      },
      email: {
        ...initial_state.email,
        errors: ['Email is required.']
      },
      request: {
        ...initial_state.request,
        allow_submit: false
      }
    });
  });

  it('handles SIGNUP_SEND_ERROR_CLEAR', () => {
    expect(subject({
      ...initial_state,
      request: {
        ...initial_state.request,
        sending: false,
        status: 'failed',
        error: '405 : Method Not Allowed',
        allow_submit: true
      }
    }, {
      type: 'SIGNUP_SEND_ERROR_CLEAR'
    })).to.deep.equal({
      ...initial_state,
      request: {
        ...initial_state.request,
        allow_submit: true
      }
    });
  });

  it('handles SIGNUP_SEND_SUCCESSFUL with field errors', () => {
    expect(subject({
      ...initial_state,
      request: {
        ...initial_state.request,
        sending: true,
      }
    }, {
      type: 'SIGNUP_SEND_SUCCESSFUL'
    })).to.deep.equal({
      ...initial_state,
      request: {
        ...initial_state.request,
        status: 'successful'
      }
    });
  });
});