import initial_state from './initial_states/reservation';

export default function reservation(state = initial_state, action) {
  switch(action.type) {
    case 'RESERVATION_CANCEL_START':
      return {
        ...state,
        request: {
          ...state.request,
          sending: true
        }
      }
    break;

    case 'RESERVATION_CANCEL_SUCCESSFUL':
      return {
        ...state,
        request: {
          ...state.request,
          sending: false,
          status: 'cancelled',
          message: action.message
        }
      }
    break;

    case 'RESERVATION_CANCEL_FAILED':
      return {
        ...state,
        request: {
          ...state.request,
          sending: false,
          status: 'failed',
          message: action.message
        }
      }
    break;

    case 'RESERVATION_REQUEST_CLEAR':
      return {
        ...initial_state
      }
    break;

    case 'RESERVATION_CHANGE_SEATS':
      return {
        ...state,
        seats: action.value
      }
    break;

    case 'RESERVATION_MAKE_START':
      return {
        ...state,
        request: {
          ...state.request,
          sending: true
        }
      }
    break;

    case 'RESERVATION_MAKE_SUCCESSFUL':
      return {
        ...initial_state,
        request: {
          ...initial_state.request,
          status: 'made',
          message: action.message
        }
      }
    break;

    case 'RESERVATION_MAKE_FAILED':
      return {
        ...state,
        request: {
          ...initial_state.request,
          status: 'failed',
          message: action.message
        }
      }
    break;
  }

  return state;
}