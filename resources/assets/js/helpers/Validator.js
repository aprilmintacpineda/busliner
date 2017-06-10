/**
 * validates email
 * @param  string email value of email
 * @return array       error list
 */
export function validateEmail(email) {
  let errors = [];

  if(!email.trim().length) {
    errors.push('Email is required.');
  } else if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
    errors.push('Email is invalid.');
  }

  return errors;
}

/**
 * validates name
 * @param  string what name type, i.e. first name, middle name
 * @param  string name value
 * @return array      error list
 */
export function validateName(what, name) {
  let errors = [],
        names = name.split(' '),
        excessiveSpaces = false,
        invalidName = false;

  if(!name.trim().length) {
    errors.push(what + ' is required.');
  } else {
    for(let substr of names) {
      if(!substr.length || /( {2,})/.test(substr)) {
        if(!excessiveSpaces) {
          errors.push(what + ' contains excessive spaces.');
          excessiveSpaces = true;
        }
      } else if(!/^[a-zA-Z ]+$/.test(substr) || substr.length <= 2 || substr.length > 75) {
        if(!invalidName) {
          errors.push(what + ' is invalid.');
          invalidName = true;
        }
      }
    }
  }

  return errors;
}

/**
 * validates password in accordance to password again
 * for sign up/registration only
 * @param  string password      value of password
 * @param  string passwordAgain value of password again
 * @return array               error list
 */
export function validatePasswords(password, passwordAgain) {
  let errors = [];

  if((!password.trim().length && passwordAgain.trim().length) || !password.trim().length) {
    errors.push('Password is required.');
  } else if(password.length < 6) {
    errors.push('Password is too weak.');
  } else if(password.length > 255) {
    errors.push('Password is too long.');
  }

  return errors;
}

/**
 * validate password again in accordance to password
 * for sign up/registration only
 * @param  string password      value of password
 * @param  string passwordAgain value of password again
 * @return array               error list
 */
export function validatePasswordAgain(password, passwordAgain) {
  let errors = [];

  if(password.trim().length) {
    if(!passwordAgain.trim().length) {
      errors.push('Enter your password again.');
    } else if(password != passwordAgain) {
      errors.push('Passwords do not match.');
    }
  }

  return errors;
}

/**
 * validates password with no password again
 * @param  string password value of password
 * @return array          error list
 */
export function validatePassword(password) {
  let errors = [];

  if(!password.trim().length) {
    errors.push('Password is required.');
  }

  return errors;
}