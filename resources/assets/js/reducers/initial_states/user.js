export default window && window.logged_in_user? {
  logged_in: true,
  ...window.logged_in_user
} : {
  logged_in: false
};