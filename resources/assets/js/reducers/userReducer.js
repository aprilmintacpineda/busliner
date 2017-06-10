import initial_state from './initial_states/user';

export default function userReducer(state = initial_state, action) {
  let newState;

  switch(action.type) {
    case 'USER_LOGIN':
      return {
        ...state,
        logged_in: true,
        ...action.data
      }
    break;
  }

  return state;
}