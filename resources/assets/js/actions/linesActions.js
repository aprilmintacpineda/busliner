export function fetchData() {
  return {
    type: 'LINES_FETCH_DATA_START'
  }
}

export function clearRequestError() {
  return {
    type: 'LINES_REQUEST_ERROR_CLEAR'
  }
}

export function clearAllLines() {
  return {
    type: 'LINES_CLEAR_ALL'
  }
}