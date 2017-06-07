import { all } from 'redux-saga/effects';

// sagas
import signUpSaga from './signUpSaga';

export default function* rootSaga() {
  yield all([
    signUpSaga()
  ]);
}