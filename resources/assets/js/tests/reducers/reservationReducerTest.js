import { expect } from 'chai';

import subject from '../../reducers/reservationReducer';
import initial_state from '../../reducers/initial_states/reservation';

describe('reducers/reservationReducer', () => {
  it('handles RESERVATION_CHANGE_SEATS', () => {
    expect(subject(initial_state, {
      type: 'RESERVATION_CHANGE_SEATS',
      value: 2
    })).to.deep.equal({
      ...initial_state,
      seats: 2
    });
  });

  it('handles RESERVATION_SEND_START', () => {
    expect(subject(initial_state, {
      type: 'RESERVATION_SEND_START'
    })).to.deep.equal({
      ...initial_state,
      request: {
        ...initial_state.request,
        sending: true
      }
    });
  });

  it('handles RESERVATION_SEND_SUCCESSFUL', () => {
    expect(subject({
      ...initial_state,
      request: {
        ...initial_state.request,
        sending: true
      }
    }, {
      type: 'RESERVATION_SEND_SUCCESSFUL',
      message: 'blah blah blah'
    })).to.deep.equal({
      ...initial_state,
      request: {
        ...initial_state.request,
        sending: false,
        status: 'successful',
        message: 'blah blah blah'
      }
    });
  });

  it('handles RESERVATION_SEND_FAILED', () => {
    expect(subject({
      ...initial_state,
      request: {
        ...initial_state.request,
        sending: true
      }
    }, {
      type: 'RESERVATION_SEND_FAILED',
      message: 'something bad happened'
    })).to.deep.equal({
      ...initial_state,
      request: {
        ...initial_state.request,
        sending: false,
        status: 'failed',
        message: 'something bad happened'
      }
    });
  });

  it('handles RESERVATION_REQUEST_CLEAR', () => {
    expect(subject({
      ...initial_state,
      request: {
        ...initial_state.request,
        status: 'successful',
        message: 'blah blah blah blah'
      }
    }, {
      type: 'RESERVATION_REQUEST_CLEAR'
    })).to.deep.equal(initial_state);
  });
});