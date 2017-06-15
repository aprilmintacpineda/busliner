import { all } from 'redux-saga/effects';

// sagas
import signUpSaga from './signUpSaga';
import signInSaga from './signInSaga';
import linesSaga from './linesSaga';
import lineSaga from './lineSaga';
import reservationSaga from './reservationSaga';

export default function* rootSaga() {
  yield all([
    signUpSaga(),
    signInSaga(),
    linesSaga(),
    lineSaga(),
    reservationSaga()
  ]);
}