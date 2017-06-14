export function fetchData(id) {
  return {
    type: 'LINE_FETCH_DATA_START',
    id
  }
}

export function clearData() {
  return {
    type: 'LINE_FETCH_DATA_CLEAR'
  }
}