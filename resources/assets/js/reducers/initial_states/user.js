// for testing, uncomment this out
// let window = {}

const initial_state = {
  reservations: {
    request: {
      error: null,
      sending: false,
      page: 1
    },
    data: []
  }
}

export default window.logged_in_user? {
  ...initial_state,
  logged_in: true,
  ...window.logged_in_user
} : {
  ...initial_state,
  logged_in: false
};