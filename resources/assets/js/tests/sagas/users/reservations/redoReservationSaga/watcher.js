import 'babel-polyfill';
import { expect } from 'chai';
import { take, fork } from 'redux-saga/effects';

import redoReservationSagaWatcher, { redoReservationSagaWorker } from '../../../../../sagas/users/reservations/redoReservationSaga';

const iterator = redoReservationSagaWatcher();

describe('sagas/redoReservationSagaWatcher', () => {
  it('watches for USER_RESERVATIONS_UNDO_START', () => {
    expect(iterator.next().value).to.deep.equal(take('USER_RESERVATIONS_UNDO_START'));
  });

  it('forks redoReservationSagaWorker', () => {
    expect(iterator.next({
      type: 'USER_RESERVATIONS_UNDO_START',
      line_id: 1
    }).value).to.deep.equal(fork(redoReservationSagaWorker, {
      type: 'USER_RESERVATIONS_UNDO_START',
      line_id: 1
    }));
  });

  it('watches again for USER_RESERVATIONS_UNDO_START', () => {
    expect(iterator.next().value).to.deep.equal(take('USER_RESERVATIONS_UNDO_START'));
  });
});