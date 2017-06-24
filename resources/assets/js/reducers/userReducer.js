import initial_state from './initial_states/user';

export default function userReducer(state = initial_state, action) {
  let reservation_list;

  switch(action.type) {
    case 'USER_CLEAR_ALL':
      return {
        ...state,
        reservations: {
          ...initial_state.reservations
        }
      }
    break;

    case 'USER_LOGIN':
      return {
        ...state,
        logged_in: true,
        ...action.data
      }
    break;

    case 'USER_RESERVATIONS_UNDO_START':
      reservation_list = state.reservations.data.map(reservation => reservation.line.id == action.line_id?
        ({
          ...reservation,
          request: {
            ...reservation.request,
            sending: true
          }
        }) : reservation);

      return {
        ...state,
        reservations: {
          ...state.reservations,
          data: [...reservation_list]
        }
      }
    break;

    case 'USER_RESERVATIONS_UNDO_SUCCESSFUL':
      reservation_list = state.reservations.data.map(reservation => reservation.line.id == action.line_id? ({
        ...reservation,
        is_cancelled: 0,
        request: {
          sending: false,
          error: null
        }
      }) : reservation);

      return {
        ...state,
        reservations: {
          ...state.reservations,
          data: [...reservation_list]
        }
      }
    break;

    case 'USER_RESERVATIONS_UNDO_FAILED':
      reservation_list = state.reservations.data.map(reservation => reservation.line.id == action.line_id? ({
          ...reservation,
          request: {
            ...reservation.request,
            sending: false,
            error: action.message
          }
        }) : reservation);

      return {
        ...state,
        reservations: {
          ...state.reservations,
          data: [...reservation_list]
        }
      }
    break;

    case 'USER_RESERVATIONS_CANCEL_START':
      reservation_list = state.reservations.data.map(reservation => reservation.line.id == action.line_id? ({
          ...reservation,
          request: {
            ...reservation.request,
            sending: true
          }
        }) : reservation);

      return {
        ...state,
        reservations: {
          ...state.reservations,
          data: [...reservation_list]
        }
      }
    break;

    case 'USER_RESERVATIONS_CANCEL_SUCCESSFUL':
      reservation_list = state.reservations.data.map(reservation => reservation.line.id == action.line_id? ({
        ...reservation,
        is_cancelled: 1,
        request: {
          ...reservation.request,
          sending: false
        }
      }) : reservation);

      return {
        ...state,
        reservations: {
          ...state.reservations,
          data: [...reservation_list]
        }
      }
    break;

    case 'USER_RESERVATIONS_CANCEL_FAILED':
      reservation_list = state.reservations.data.map(reservation => reservation.line.id == action.line_id? ({
        ...reservation,
        request: {
          ...reservation.request,
          sending: false,
          error: action.message
        }
      }) : reservation);

      return {
        ...state,
        reservations: {
          ...state.reservations,
          data: [...reservation_list]
        }
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
      reservation_list = action.data.map(action => {
        return {
          ...action,
          request: {
            sending: false,
            error: null
          }
        }
      });

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
            ...reservation_list
          ]
        }
      }
    break;

    case 'USER_RESERVATIONS_FETCH_FAILED':
      return {
        ...state,
        reservations: {
          ...state.reservations,
          request: {
            ...initial_state.reservations.request,
            error: action.message
          },
          data: [
            ...state.reservations.data
          ]
        }
      }
    break;
  }

  return state;
}