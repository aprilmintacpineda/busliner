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

export function undoCancelReservation(line_id, seats) {
  return {
    type: 'USER_RESERVATIONS_UNDO_START',
    line_id,
    seats
  }
}

export function clearAllData() {
  return {
    type: 'USER_CLEAR_ALL'
  }
}