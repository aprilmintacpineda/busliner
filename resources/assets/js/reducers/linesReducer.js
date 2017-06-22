import initial_state from './initial_states/lines';

export default function lines(state = initial_state, action) {
  switch(action.type) {
    case 'LINES_FETCH_DATA_START':
      return {
        ...state,
        request: {
          ...initial_state.request,
          sending: true
        }
      }
    break;

    case 'LINES_FETCH_DATA_SUCCESSFUL':
      return {
        ...state,
        request: {
          ...initial_state.request,
          page: state.request.page + 1
        },
        data: [
          ...state.data,
          ...action.data
        ]
      }
    break;

    case 'LINES_FETCH_DATA_FAILED':
      return {
        ...state,
        request: {
          ...state.request,
          sending: false,
          status: 'failed',
          error: action.message
        }
      }
    break;

    case 'LINES_REQUEST_ERROR_CLEAR':
      return {
        ...state,
        request: {
          ...state.request,
          status: null,
          error: null
        }
      }
    break;

    case 'LINES_CLEAR_ALL':
      return {...initial_state}
    break;
  }

  return state;
}