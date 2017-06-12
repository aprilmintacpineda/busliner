import { combineReducers } from 'redux';

import signUpForm from './signUpFormReducer';
import signInForm from './signInFormReducer';
import popMessage from './popMessageReducer';
import user from './userReducer';
import lines from './linesReducer';

export default combineReducers({
  signUpForm,
  signInForm,
  popMessage,
  user,
  lines
});