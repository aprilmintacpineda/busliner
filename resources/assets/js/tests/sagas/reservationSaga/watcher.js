import { expect } from 'chai';
import { take, fork } from 'redux-saga/effects';

import reservationSagaWatcher, { reservationSagaWorker } from '../../../sagas/reservationSaga';

const iterator = reservationSagaWatcher();

describe('sagas/reservationSagaWatcher', () => {
  it('watches for RESERVATION_SEND_START', () => {
    expect(iterator.next().value).to.deep.equal(take('RESERVATION_SEND_START'));
  });

  it('forks the reservationSagaWorker', () => {
    expect(iterator.next().value).to.deep.equal(fork(reservationSagaWorker));
  });

  it('watches again for RESERVATION_SEND_START', () => {
    expect(iterator.next().value).to.deep.equal(take('RESERVATION_SEND_START'));
  });
});