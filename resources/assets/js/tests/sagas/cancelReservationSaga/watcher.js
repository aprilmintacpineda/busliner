import 'babel-polyfill';

import { take, fork } from 'redux-saga/effects';
import { expect } from 'chai';

import cancelReservationSagaWatcher, { cancelReservationSagaWorker } from '../../../sagas/cancelReservationSaga';

const iterator = cancelReservationSagaWatcher();

describe('sagas/cancelReservationSagaWatcher', () => {
  it('watches for RESERVATION_CANCEL_START', () => {
    expect(iterator.next().value).to.deep.equal(take('RESERVATION_CANCEL_START'));
  });

  it('forks cancelReservationSagaWorker', () => {
    expect(iterator.next({
      type: 'RESERVATION_CANCEL_START',
      line_id: 123
    }).value).to.deep.equal(fork(cancelReservationSagaWorker, {
      type: 'RESERVATION_CANCEL_START',
      line_id: 123
    }));
  });

  it('watches again for RESERVATION_CANCEL_START', () => {
    expect(iterator.next().value).to.deep.equal(take('RESERVATION_CANCEL_START'));
  });
});