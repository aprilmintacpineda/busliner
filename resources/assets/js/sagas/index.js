import { all } from 'redux-saga/effects';

// sagas
import signUpSaga from './signUpSaga';
import signInSaga from './signInSaga';

export default function* rootSaga() {
  yield all([
    signUpSaga(),
    signInSaga()
  ]);
}