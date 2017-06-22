import 'babel-polyfill';
import { call, put } from 'redux-saga/effects';
import { expect } from 'chai';
import axios from 'axios'

import { cancelReservationSagaWorker } from '../../../../../sagas/users/reservations/cancelReservationSaga';

const iterator = cancelReservationSagaWorker({
  type: 'USER_RESERVATIONS_CANCEL_START',
  line_id: 1
});

describe('sagas/users/cancelReservationSagaWorker', () => {
  it('calls to /reservation/cancel post', () => {
    expect(iterator.next().value).to.deep.equal(call(axios.post, '/reservation/cancel', {
      line_id: 1
    }));
  });

  it('dispatches USER_RESERVATIONS_CANCEL_SUCCESSFUL', () => {
    expect(iterator.next({
      data: 'successfully cancelled'
    }).value).to.deep.equal(put({
      type: 'USER_RESERVATIONS_CANCEL_SUCCESSFUL',
      line_id: 1,
      message: 'successfully cancelled'
    }));
  });

  it('dispatches USER_RESERVATIONS_CANCEL_FAILED', () => {
    expect(iterator.throw({
      response: {
        data: 'failed',
        status: 422
      }
    }).value).to.deep.equal(put({
      type: 'USER_RESERVATIONS_CANCEL_FAILED',
      line_id: 1,
      message: 'failed'
    }));
  });
});