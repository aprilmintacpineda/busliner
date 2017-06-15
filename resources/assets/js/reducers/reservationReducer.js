import initial_state from './initial_states/reservation';

export default function reservation(state = initial_state, action) {
  switch(action.type) {
    case 'RESERVATION_CHANGE_SEATS':
      return {
        ...state,
        seats: action.value
      }
    break;

    case 'RESERVATION_SEND_START':
      return {
        ...state,
        request: {
          ...state.request,
          sending: true
        }
      }
    break;

    case 'RESERVATION_SEND_SUCCESSFUL':
      return {
        ...initial_state,
        request: {
          ...initial_state.request,
          status: 'successful'
        }
      }
    break;

    case 'RESERVATION_SEND_FAILED':
      return {
        ...state,
        request: {
          ...initial_state.request,
          status: 'failed',
          error: action.message
        }
      }
    break;
  }

  return state;
}