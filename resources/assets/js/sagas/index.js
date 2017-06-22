import { all } from 'redux-saga/effects';

// sagas
import signUpSaga from './signUpSaga';
import signInSaga from './signInSaga';
import linesSaga from './linesSaga';
import lineSaga from './lineSaga';

import makeReservationSaga from './reservations/makeReservationSaga';
import cancelReservationSaga from './reservations/cancelReservationSaga';
import fetchReservationSaga from './users/reservations/fetchReservationSaga';
import userCancelReservationSaga from './users/reservations/cancelReservationSaga';
import userRedoReservationSaga from './users/reservations/redoReservationSaga';

export default function* rootSaga() {
  yield all([
    signUpSaga(),
    signInSaga(),
    linesSaga(),
    lineSaga(),
    // reservations
    makeReservationSaga(),
    cancelReservationSaga(),
    fetchReservationSaga(),
    // user
    userCancelReservationSaga(),
    userRedoReservationSaga()
  ]);
}