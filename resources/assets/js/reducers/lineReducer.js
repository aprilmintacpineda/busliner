import initial_state from './initial_states/line';

export default function line(state = initial_state, action) {
  switch(action.type) {
    case 'LINE_HAS_RESERVED':
      return {
        ...state,
        data: {
          ...state.data,
          reserved: true,
          available_seats: state.data.available_seats - action.seats,
        }
      }
    break;

    case 'LINE_HASNT_RESERVED':
      return {
        ...state,
        data: {
          ...state.data,
          available_seats: state.data.available_seats + action.seats,
          reserved: false
        }
      }
    break;

    case 'LINE_FETCH_DATA_START':
      return {
        ...state,
        request: {
          ...initial_state.request,
          sending: true
        }
      }
    break;

    case 'LINE_FETCH_DATA_SUCCESSFUL':
      return {
        ...state,
        request: {
          ...state.request,
          sending: false,
          status: 'fetched'
        },
        data: {
          ...action.data
        }
      }
    break;

    case 'LINE_FETCH_DATA_FAILED':
      return {
        ...state,
        request: {
          sending: false,
          status: 'failed',
          error: action.message
        }
      }
    break;

    case 'LINE_FETCH_DATA_CLEAR':
      return {
        ...initial_state
      }
    break;
  }

  return state;
}