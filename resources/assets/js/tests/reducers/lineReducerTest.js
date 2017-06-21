import { expect } from 'chai';

import subject from '../../reducers/lineReducer';
import initial_state from '../../reducers/initial_states/line';

describe('reducers/lineReducer', () => {
  it('has initial state', () => {
    expect(subject(undefined, {
      type: 'init'
    })).to.deep.equal(initial_state);
  });

  it('handles LINE_FETCH_DATA_START', () => {
    expect(subject(initial_state, {
      type: 'LINE_FETCH_DATA_START'
    })).to.deep.equal({
      ...initial_state,
      request: {
        ...initial_state.request,
        sending: true,
      }
    });
  });

  it('handles LINE_FETCH_DATA_SUCCESSFUL', () => {
    expect(subject({
      ...initial_state,
      request: {
        ...initial_state.request,
        sending: true
      }
    }, {
      type: 'LINE_FETCH_DATA_SUCCESSFUL',
      data: {
        id: 1
      }
    })).to.deep.equal({
      ...initial_state,
      request: {
        ...initial_state.request,
        sending: false,
        status: 'fetched'
      },
      data: {
        id: 1
      }
    });
  });

  it('it handles LINE_FETCH_DATA_FAILED', () => {
    expect(subject({
      ...initial_state,
      request: {
        ...initial_state.request,
        sending: true
      }
    }, {
      type: 'LINE_FETCH_DATA_FAILED',
      message: 'something bad happened.'
    })).to.deep.equal({
      ...initial_state,
      request: {
        ...initial_state.request,
        sending: false,
        status: 'failed',
        error: 'something bad happened.'
      }
    });
  });

  it('handles LINE_FETCH_DATA_CLEAR', () => {
    expect(subject({
      ...initial_state,
      data: {
        ...initial_state.data,
        id: 123,
        destination: 'batangas'
      }
    }, {
      type: 'LINE_FETCH_DATA_CLEAR'
    })).to.deep.equal(initial_state);
  });

  it('handles LINE_HAS_RESERVED', () => {
    expect(subject({
      ...initial_state,
      data: {
        ...initial_state.data,
        available_seats: 8
      }
    }, {
      type: 'LINE_HAS_RESERVED',
      seats: 5
    })).to.deep.equal({
      ...initial_state,
      data: {
        ...initial_state.data,
        available_seats: 3,
        reserved: true
      }
    });
  });

  it('handles LINE_HASNT_RESERVED', () => {
    expect(subject({
      ...initial_state,
      data: {
        ...initial_state.data,
        available_seats: 5
      }
    }, {
      type: 'LINE_HASNT_RESERVED',
      seats: 3
    })).to.deep.equal({
      ...initial_state,
      data: {
        ...initial_state.data,
        available_seats: 8
      }
    });
  });
});