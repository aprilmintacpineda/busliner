import initial_state from '../../reducers/initial_states/sign-up-form';
import subject from '../../reducers/signUpFormReducer';
import { expect } from 'chai';

describe('reducers/signUpFormReducer', () => {
  it('has initial state', () => {
    expect(subject(undefined, {
      type: 'INIT'
    })).to.deep.equal(initial_state);
  });

  it('handles CHANGE_FIRST_NAME with error checking', () => {
    expect(subject(initial_state, {
      type: 'CHANGE_FIRST_NAME',
      value: ''
    })).to.deep.equal({
      ...initial_state,
      first_name: {
        errors: ['First name is required.'],
        value: ''
      }
    });

    expect(subject(initial_state, {
      type: 'CHANGE_FIRST_NAME',
      value: 'april-'
    })).to.deep.equal({
      ...initial_state,
      first_name: {
        errors: ['First name is invalid.'],
        value: 'april-'
      }
    });
  });

  it('handles CHANGE_MIDDLE_NAME with error checking', () => {
    expect(subject(initial_state, {
      type: 'CHANGE_MIDDLE_NAME',
      value: ''
    })).to.deep.equal({
      ...initial_state,
      middle_name: {
        errors: ['Middle name is required.'],
        value: ''
      }
    });

    expect(subject(initial_state, {
      type: 'CHANGE_MIDDLE_NAME',
      value: 'april-'
    })).to.deep.equal({
      ...initial_state,
      middle_name: {
        errors: ['Middle name is invalid.'],
        value: 'april-'
      }
    });
  });

  it('handles CHANGE_SURNAME with error checking', () => {
    expect(subject(initial_state, {
      type: 'CHANGE_SURNAME',
      value: ''
    })).to.deep.equal({
      ...initial_state,
      surname: {
        errors: ['Surname is required.'],
        value: ''
      }
    });

    expect(subject(initial_state, {
      type: 'CHANGE_SURNAME',
      value: 'april-'
    })).to.deep.equal({
      ...initial_state,
      surname: {
        errors: ['Surname is invalid.'],
        value: 'april-'
      }
    });
  });

  it('handles CHANGE_EMAIL with error checking', () => {
    expect(subject(initial_state, {
      type: 'CHANGE_EMAIL',
      value: ''
    })).to.deep.equal({
      ...initial_state,
      email: {
        errors: ['Email is required.'],
        value: ''
      }
    });

    expect(subject(initial_state, {
      type: 'CHANGE_EMAIL',
      value: 'april-'
    })).to.deep.equal({
      ...initial_state,
      email: {
        errors: ['Email is invalid.'],
        value: 'april-'
      }
    });
  });

  it('handles CHANGE_PASSWORD with error checking', () => {
    expect(subject(initial_state, {
      type: 'CHANGE_PASSWORD',
      value: ''
    })).to.deep.equal({
      ...initial_state,
      password: {
        errors: ['Password is required.'],
        value: ''
      }
    });

    expect(subject(initial_state, {
      type: 'CHANGE_PASSWORD',
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
      type: 'CHANGE_PASSWORD',
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

  it('handles CHANGE_PASSWORD_AGAIN with error checking', () => {
    expect(subject({
      ...initial_state,
      password: {
        ...initial_state.password,
        value: 'asd'
      },
      password_again: {
        ...initial_state.password_again,
        value: 'a'
      }
    }, {
      type: 'CHANGE_PASSWORD_AGAIN',
      value: 'a'
    })).to.deep.equal({
      ...initial_state,
      password: {
        ...initial_state.password,
        value: 'asd'
      },
      password_again: {
        errors: ['Passwords do not match.'],
        value: 'a'
      }
    });
  });

  it('handles SEND_START with error checking', () => {
    expect(subject({
      ...initial_state,
      request: {
        ...initial_state.request,
        allow_submit: true
      }
    }, {
      type: 'SEND_START'
    })).to.deep.equal({
      ...initial_state,
      request: {
        ...initial_state.request,
        allow_submit: true,
        sending: true
      }
    });
  });

  it('handles SEND_FAILED', () => {
    expect(subject({
      ...initial_state,
      request: {
        sending: true,
        status: null,
        error: null,
        allow_submit: true
      }
    }, {
      type: 'SEND_FAILED',
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
  });

  it('handles SEND_ERROR_CLEAR', () => {
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
      type: 'SEND_ERROR_CLEAR'
    })).to.deep.equal({
      ...initial_state,
      request: {
        ...initial_state.request,
        allow_submit: true
      }
    });
  });

  it('handles SEND_SUCCESSFUL with field errors', () => {
    
  });
});