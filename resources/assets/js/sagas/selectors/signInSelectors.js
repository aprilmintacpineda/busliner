export function formValues(store) {
  return {
    email: store.signInForm.email.value,
    password: store.signInForm.password.value
  }
}