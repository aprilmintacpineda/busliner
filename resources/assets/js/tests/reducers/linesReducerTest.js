import { expect } from 'chai';

import initial_state from '../../reducers/initial_states/lines';
import subject from '../../reducers/linesReducer';

describe('reducers/linesReducer', () => {
  it('has initial state', () => {
    expect(subject(undefined, {
      type: 'INIT'
    })).to.deep.equal(initial_state);
  });

  it('handles LINES_FETCH_DATA_START', () => {
    expect(subject(initial_state, {
      type: 'LINES_FETCH_DATA_START'
    })).to.deep.equal({
      ...initial_state,
      request: {
        ...initial_state.request,
        sending: true
      }
    });
  });

  it('handles LINES_FETCH_DATA_SUCCESSFUL', () => {
    expect(subject(initial_state, {
      type: 'LINES_FETCH_DATA_SUCCESSFUL',
      data: [
        {
          id: 1,
          driver_id: 1
        }
      ]
    })).to.deep.equal({
      ...initial_state,
      request: {
        ...initial_state.request,
        page: initial_state.request.page + 1
      },
      data: [
        {
          id: 1,
          driver_id: 1
        }
      ]
    });
  });

  it('handles LINES_FETCH_DATA_FAILED', () => {
    expect(subject({
      ...initial_state,
      request: {
        ...initial_state.request,
        sending: false
      }
    }, {
      type: 'LINES_FETCH_DATA_FAILED',
      message: 'A DUMMY ERROR MESSAGE.'
    })).to.deep.equal({
      ...initial_state,
      request: {
        ...initial_state.request,
        status: 'failed',
        error: 'A DUMMY ERROR MESSAGE.'
      }
    });
  });

  it('handles LINES_REQUEST_ERROR_CLEAR', () => {
    expect(subject({
      ...initial_state,
      request: {
        ...initial_state.request,
        status: 'failed',
        error: 'SOMETHING BAD HAPPENED.'
      }
    }, {
      type: 'LINES_REQUEST_ERROR_CLEAR'
    })).to.deep.equal(initial_state);
  });
});