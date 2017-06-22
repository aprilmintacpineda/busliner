import 'babel-polyfill';
import { expect } from 'chai';
import { put, call, select } from 'redux-saga/effects';
import axios from 'axios';

import { redoReservationSagaWorker } from '../../../../../sagas/users/reservations/redoReservationSaga';

const iterator = redoReservationSagaWorker({
  type: 'USER_RESERVATIONS_UNDO_START',
  line_id: 1
});

describe('sagas/redoReservationSagaWorker', () => {
  it('calls post method to /reservation/redo', () => {
    expect(iterator.next().value).to.deep.equal(call(axios.post, '/reservation/redo', {
      line_id: 1
    }));
  });

  it('dispatches USER_RESERVATIONS_UNDO_SUCCESSFUL', () => {
    expect(iterator.next().value).to.deep.equal(put({
      type: 'USER_RESERVATIONS_UNDO_SUCCESSFUL',
      line_id: 1
    }));
  });

  it('dispatches USER_RESERVATIONS_UNDO_FAILED', () => {
    expect(iterator.throw({
      response: {
        status: 403,
        statusText: 'Unauthorized.'
      }
    }).value).to.deep.equal(put({
      type: 'USER_RESERVATIONS_UNDO_FAILED',
      line_id: 1,
      message: 'You must be logged in before you can make/cancel any reservations.'
    }));
  });
});