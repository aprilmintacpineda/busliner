import 'babel-polyfill';
import { take, fork } from 'redux-saga/effects';
import { expect } from 'chai';

import cancelReservationSagaWatcher, { cancelReservationSagaWorker } from '../../../../../sagas/users/reservations/cancelReservationSaga';

const iterator = cancelReservationSagaWatcher();

describe('sagas/users/cancelReservationSagaWatcher', () => {
  it('watches for USER_RESERVATIONS_CANCEL_START', () => {
    expect(iterator.next().value).to.deep.equal(take('USER_RESERVATIONS_CANCEL_START'));
  });

  it('forks the worker', () => {
    expect(iterator.next({
      type: 'USER_RESERVATIONS_CANCEL_START',
      line_id: 1
    }).value).to.deep.equal(fork(cancelReservationSagaWorker, {
      type: 'USER_RESERVATIONS_CANCEL_START',
      line_id: 1
    }));
  });

  it('watches again for USER_RESERVATIONS_CANCEL_START', () => {
    expect(iterator.next().value).to.deep.equal(take('USER_RESERVATIONS_CANCEL_START'));
  });
});