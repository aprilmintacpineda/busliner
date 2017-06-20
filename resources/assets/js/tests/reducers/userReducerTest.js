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
});