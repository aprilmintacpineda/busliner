export function reservationListFetch() {
  return {
    type: 'USER_RESERVATIONS_FETCH_START'
  }
}

export function cancelReservation(line_id) {
  return {
    type: 'USER_RESERVATIONS_CANCEL_START',
    line_id
  }
}

