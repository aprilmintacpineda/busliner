export function changeSeats(value) {
  return {
    type: 'RESERVATION_CHANGE_SEATS',
    value
  }
}

export function send() {
  return {
    type: 'RESERVATION_SEND_START'
  }
}

export function clearReservationMessage() {
  return {
    type: 'RESERVATION_REQUEST_CLEAR'
  }
}