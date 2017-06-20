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

    case 'USER_RESERVATIONS_FETCH_START':
      return {
        ...state,
        reservations: {
          ...initial_state.reservations,
          request: {
            ...initial_state.reservations.request,
            sending: true
          },
        }
      }
    break;

    case 'USER_RESERVATIONS_FETCH_SUCCESSFUL':
      return {
        ...state,
        reservations: {
          ...state.reservations,
          request: {
            ...initial_state.reservations.request,
            page: state.reservations.request.page + 1
          },
          data: [
            ...state.reservations.data,
            ...action.data
          ]
        }
      }
    break;

    case 'USER_RESERVATIONS_FETCH_FAILED':
    break;
  }

  return state;
}