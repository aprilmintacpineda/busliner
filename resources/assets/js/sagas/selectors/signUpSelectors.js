export function formValues(state) {
  return {
    first_name: state.signUpForm.first_name.value,
    middle_name: state.signUpForm.middle_name.value,
    surname: state.signUpForm.surname.value,
    email: state.signUpForm.email.value,
    password: state.signUpForm.password.value,
    password_again: state.signUpForm.password_again.value
  }
}