export function changeSeats(value) {
  return {
    type: 'RESERVATION_CHANGE_SEATS',
    value
  }
}

export function send(line_id) {
  return {
    type: 'RESERVATION_SEND_START',
    line_id
  }
}

export function clearReservationMessage() {
  return {
    type: 'RESERVATION_REQUEST_CLEAR'
  }
}