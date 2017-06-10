import { combineReducers } from 'redux';

import signUpForm from './signUpFormReducer';
import signInForm from './signInFormReducer';
import popMessage from './popMessageReducer';

export default combineReducers({
  signUpForm,
  signInForm,
  popMessage
});