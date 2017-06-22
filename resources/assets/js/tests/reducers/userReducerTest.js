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
          page: 2
        },
        data: [
          {
            id: 1,
            name: 'test',
            request: {
              sending: false,
              error: null
            }
          },
          {
            id: 2,
            name: 'test again',
            request: {
              sending: false,
              error: null
            }
          }
        ]
      }
    });
  });

  it('handles USER_RESERVATIONS_FETCH_FAILED', () => {
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
      type: 'USER_RESERVATIONS_FETCH_FAILED',
      message: 'blah blah'
    })).to.deep.equal({
      ...initial_state,
      reservations: {
        ...initial_state.reservations,
        request: {
          ...initial_state.reservations.request,
          sending: false,
          error: 'blah blah'
        }
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
            request: {
              sending: false,
              error: null
            }
          },
          {
            line: {
              id: 2
            },
            name: 'test again',
            request: {
              sending: false,
              error: null
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
            request: {
              sending: false,
              error: null
            }
          },
          {
            line: {
              id: 2
            },
            name: 'test again',
            request: {
              sending: true,
              error: null
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
            is_cancelled: 0,
            name: 'test',
            request: {
              sending: false,
              error: null
            }
          },
          {
            line: {
              id: 2
            },
            is_cancelled: 0,
            name: 'test again',
            request: {
              sending: true,
              error: null
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
            is_cancelled: 0,
            name: 'test',
            request: {
              sending: false,
              error: null
            }
          },
          {
            line: {
              id: 2
            },
            is_cancelled: 1,
            name: 'test again',
            request: {
              sending: false,
              error: null
            }
          }
        ]
      }
    });
  });

  it('handles USER_RESERVATIONS_CANCEL_FAILED', () => {
    expect(subject({
      ...initial_state,
      reservations: {
        ...initial_state.reservations,
        data: [{
          line: {
            id: 1
          },
          is_cancelled: 0,
          name: 'test',
          request: {
            error: null,
            sending: true
          }
        }]
      }
    }, {
      type: 'USER_RESERVATIONS_CANCEL_FAILED',
      message: 'blah blah',
      line_id: 1
    })).to.deep.equal({
      ...initial_state,
      reservations: {
        ...initial_state.reservations,
        data: [{
          line: {
            id: 1
          },
          is_cancelled: 0,
          name: 'test',
          request: {
            error: 'blah blah',
            sending: false
          }
        }]
      }
    });
  });

  it('handles USER_RESERVATIONS_UNDO_SUCCESSFUL', () => {
    expect(subject({
      ...initial_state,
      reservations: {
        ...initial_state.reservations,
        data: [{
          line: {
            id: 1
          },
          is_cancelled: 1,
          name: 'test',
          request: {
            sending: true,
            error: null
          }
        }]
      }
    }, {
      type: 'USER_RESERVATIONS_UNDO_SUCCESSFUL',
      line_id: 1
    })).to.deep.equal({
      ...initial_state,
      reservations: {
        ...initial_state.reservations,
        data: [{
          line: {
            id: 1
          },
          is_cancelled: 0,
          name: 'test',
          request: {
            sending: false,
            error: null
          }
        }]
      }
    });
  });

  it('handles USER_RESERVATIONS_UNDO_FAILED', () => {
    expect(subject({
      ...initial_state,
      reservations: {
        ...initial_state.reservations,
        data: [{
          line: {
            id: 1
          },
          name: 'test',
          request: {
            sending: true,
            error: null
          }
        }]
      }
    }, {
      type: 'USER_RESERVATIONS_UNDO_FAILED',
      line_id: 1,
      message: 'blah blah'
    })).to.deep.equal({
      ...initial_state,
      reservations: {
        ...initial_state.reservations,
        data: [{
          line: {
            id: 1
          },
          name: 'test',
          request: {
            sending: false,
            error: 'blah blah'
          }
        }]
      }
    });
  });
});