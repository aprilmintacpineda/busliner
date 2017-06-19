import { expect } from 'chai';
import { take, fork } from 'redux-saga/effects';

import reservationSagaWatcher, { makeReservationSagaWorker } from '../../../sagas/makeReservationSaga';

const iterator = reservationSagaWatcher();

describe('sagas/makeReservationSagaWatcher', () => {
  it('watches for RESERVATION_MAKE_START', () => {
    expect(iterator.next().value).to.deep.equal(take('RESERVATION_MAKE_START'));
  });

  it('forks the reservationSagaWorker', () => {
    expect(iterator.next({
      type: 'RESERVATION_MAKE_START',
      line_id: 123
    }).value).to.deep.equal(fork(makeReservationSagaWorker, {
      type: 'RESERVATION_MAKE_START',
      line_id: 123
    }));
  });

  it('watches again for RESERVATION_MAKE_START', () => {
    expect(iterator.next().value).to.deep.equal(take('RESERVATION_MAKE_START'));
  });
});