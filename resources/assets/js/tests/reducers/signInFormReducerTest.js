import { expect } from 'chai';
import subject from '../../reducers/signInFormReducer';
import initial_state from '../../reducers/initial_states/sign-in-form';

describe('reducers/signInFormReducer', () => {
  it('has initial state', () => {
    expect(subject(undefined, {
      type: 'INIT'
    })).to.deep.equal(initial_state);
  });

  it('handles SIGNIN_CHANGE_EMAIL and error checking', () => {
    expect(subject(initial_state, {
      type: 'SIGNIN_CHANGE_EMAIL',
      value: 'april'
    })).to.deep.equal({
      ...initial_state,
      email: {
        errors: ['Email is invalid.'],
        value: 'april'
      }
    });

    expect(subject(initial_state, {
      type: 'SIGNIN_CHANGE_EMAIL',
      value: 'april@pineda.com'
    })).to.deep.equal({
      ...initial_state,
      email: {
        ...initial_state.email,
        value: 'april@pineda.com'
      }
    });
  });

  it('handles SIGNIN_CHANGE_PASSWORD and error checking', () => {
    expect(subject(initial_state, {
      type: 'SIGNIN_CHANGE_PASSWORD',
      value: ''
    })).to.deep.equal({
      ...initial_state,
      password: {
        ...initial_state.password,
        errors: ['Password is required.']
      }
    });

    expect(subject(initial_state, {
      type: 'SIGNIN_CHANGE_PASSWORD',
      value: 'password'
    })).to.deep.equal({
      ...initial_state,
      password: {
        ...initial_state.password,
        value: 'password'
      }
    });
  });

  it('handles SIGNIN_SEND_START', () => {
    expect(subject(initial_state, {
      type: 'SIGNIN_SEND_START'
    })).to.deep.equal({
      ...initial_state,
      request: {
        ...initial_state.request,
        sending: true
      }
    });
  });

  it('handles SIGNIN_SEND_SUCCESSFUL', () => {
    expect(subject(initial_state, {
      type: 'SIGNIN_SEND_SUCCESSFUL'
    })).to.deep.equal(initial_state);
  });

  it('handles SIGNIN_SEND_FAILED', () => {
    expect(subject(initial_state, {
      type: 'SIGNIN_SEND_FAILED',
      response: {
        email: ['Email is invalid.'],
        password: ['Password is invalid.']
      }
    })).to.deep.equal({
      ...initial_state,
      email: {
        ...initial_state.email,
        errors: ['Email is invalid.']
      },
      password: {
        ...initial_state.password,
        errors: ['Password is invalid.']
      }
    });

    expect(subject({
      ...initial_state,
      request: {
        ...initial_state.request,
        sending: true
      }
    }, {
      type: 'SIGNIN_SEND_FAILED',
      message: '500 : Internal server error'
    })).to.deep.equal({
      ...initial_state,
      request: {
        ...initial_state.request,
        status: 'failed',
        error: '500 : Internal server error'
      }
    });
  });

  it('handles SIGNIN_SEND_ERROR_CLEAR', () => {
    expect(subject({
      ...initial_state,
      request: {
        ...initial_state.request,
        status: 'failed',
        error: '500 : Internal server error'
      }
    }, {
      type: 'SIGNIN_SEND_ERROR_CLEAR'
    })).to.deep.equal(initial_state);
  });
});