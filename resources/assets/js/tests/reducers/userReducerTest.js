import { expect } from 'chai';
import initial_state from '../../reducers/initial_states/user';
import subject from '../../reducers/userReducer';

describe('reducers/userReducer', () => {
  it('has initial state', () => {
    expect(subject(undefined, {
      type: 'INIT'
    })).to.deep.equal(initial_state);
  });

  it('handles USER_LOGIN', () => {
    expect(subject(initial_state, {
      type: 'USER_LOGIN',
      data: {
        name: 'April'
      }
    })).to.deep.equal({
      ...initial_state,
      logged_in: true,
      name: 'April'
    });
  });

  it('handles USER_RESERVATIONS_FETCH_START', () => {
    expect(subject(initial_state, {
      type: 'USER_RESERVATIONS_FETCH_START'
    })).to.deep.equal({
      ...initial_state,
      reservations: {
        ...initial_state.reservations,
        request: {
          ...initial_state.reservations.request,
          sending: true
        }
      }
    });
  });

  it('handles USER_RESERVATIONS_FETCH_SUCCESSFUL', () => {
    expect(subject({
      ...initial_state,
      reservations: {
        ...initial_state.reservations,
        request: {
          ...initial_state.reservations.request,
          sending: true
        }
      }
    }, {
      type: 'USER_RESERVATIONS_FETCH_SUCCESSFUL',
      data: [
        { id: 1, name: 'test' },
        { id: 2, name: 'test again' }
      ]
    })).to.deep.equal({
      ...initial_state,
      reservations: {
        ...initial_state.reservations,
        request: {
          ...initial_state.reservations.request,
          status: 'successful',
          page: 2
        },
        data: [
          {
            id: 1,
            name: 'test',
            deleted: false,
            request: {
              sending: false,
              status: null,
              message: null
            }
          },
          {
            id: 2,
            name: 'test again',
            deleted: false,
            request: {
              sending: false,
              status: null,
              message: null
            }
          }
        ]
      }
    });
  });

  it('handles USER_RESERVATIONS_CANCEL_START', () => {
    expect(subject({
      ...initial_state,
      reservations: {
        ...initial_state.reservations,
        data: [
          {
            line: {
              id: 1
            },
            name: 'test',
            deleted: false,
            request: {
              sending: false,
              status: null,
              message: null
            }
          },
          {
            line: {
              id: 2
            },
            deleted: false,
            name: 'test again',
            request: {
              sending: false,
              status: null,
              message: null
            }
          }
        ]
      }
    }, {
      type: 'USER_RESERVATIONS_CANCEL_START',
      line_id: 2
    })).to.deep.equal({
      ...initial_state,
      reservations: {
        ...initial_state.reservations,
        data: [
          {
            line: {
              id: 1
            },
            name: 'test',
            deleted: false,
            request: {
              sending: false,
              status: null,
              message: null
            }
          },
          {
            line: {
              id: 2
            },
            name: 'test again',
            deleted: false,
            request: {
              sending: true,
              status: null,
              message: null
            }
          }
        ]
      }
    });
  });

  it('handles USER_RESERVATIONS_CANCEL_SUCCESSFUL', () => {
    expect(subject({
      ...initial_state,
      reservations: {
        ...initial_state.reservations,
        data: [
          {
            line: {
              id: 1
            },
            name: 'test',
            deleted: false,
            request: {
              sending: false,
              status: null,
              message: null
            }
          },
          {
            line: {
              id: 2
            },
            name: 'test again',
            deleted: false,
            request: {
              sending: true,
              status: null,
              message: null
            }
          }
        ]
      }
    }, {
      type: 'USER_RESERVATIONS_CANCEL_SUCCESSFUL',
      line_id: 2
    })).to.deep.equal({
      ...initial_state,
      reservations: {
        ...initial_state.reservations,
        data: [
          {
            line: {
              id: 1
            },
            name: 'test',
            deleted: false,
            request: {
              sending: false,
              status: null,
              message: null
            }
          },
          {
            line: {
              id: 2
            },
            name: 'test again',
            deleted: true,
            request: {
              sending: false,
              status: 'successful',
              message: null
            }
          }
        ]
      }
    });
  });
});