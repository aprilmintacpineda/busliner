import initial_state from './initial_states/user';

export default function userReducer(state = initial_state, action) {
  let reservation_list;

  switch(action.type) {
    case 'USER_LOGIN':
      return {
        ...state,
        logged_in: true,
        ...action.data
      }
    break;

    case 'USER_RESERVATIONS_CANCEL_START':
      reservation_list = state.reservations.data.map((reservation, index) => reservation.line.id == action.line_id?
        ({
          ...reservation,
          request: {
            ...reservation.request,
            sending: true
          },
          deleted: false
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
      reservation_list = state.reservations.data.map((reservation, index) => reservation.line.id == action.line_id? ({
        ...reservation,
        deleted: true,
        request: {
          ...reservation.request,
          sending: false,
          status: 'successful'
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
          deleted: false,
          request: {
            sending: false,
            status: null,
            message: null
          }
        }
      });

      return {
        ...state,
        reservations: {
          ...state.reservations,
          request: {
            ...initial_state.reservations.request,
            status: 'successful',
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
    break;
  }

  return state;
}