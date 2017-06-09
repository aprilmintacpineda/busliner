import { combineReducers } from 'redux';

import signUpForm from './signUpFormReducer';
import popMessage from './popMessageReducer';

export default combineReducers({
  signUpForm,
  popMessage
});