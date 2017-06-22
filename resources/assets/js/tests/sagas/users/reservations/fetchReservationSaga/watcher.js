import 'babel-polyfill';
import { expect } from 'chai';
import { take, fork } from 'redux-saga/effects';

import fetchReservationSagaWatcher, { fetchReservationSagaWorker } from '../../../../../sagas/users/reservations/fetchReservationSaga';

const iterator = fetchReservationSagaWatcher();

describe('sagas/fetchReservationSagaWatcher', () => {
  it('watches for USER_RESERVATIONS_FETCH_START', () => {
    expect(iterator.next().value).to.deep.equal(take('USER_RESERVATIONS_FETCH_START'));
  });

  it('forks fetchReservationSagaWorker', () => {
    expect(iterator.next().value).to.deep.equal(fork(fetchReservationSagaWorker));
  });

  it('watches again for USER_RESERVATIONS_FETCH_START', () => {
    expect(iterator.next().value).to.deep.equal(take('USER_RESERVATIONS_FETCH_START'));
  });
});