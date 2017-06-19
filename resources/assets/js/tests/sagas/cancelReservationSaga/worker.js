import 'babel-polyfill';

import { put, call } from 'redux-saga/effects';
import { expect } from 'chai'
import axios from 'axios';

import { cancelReservationSagaWorker } from '../../../sagas/cancelReservationSaga';

const iterator = cancelReservationSagaWorker({
  type: 'RESERVATION_CANCEL_RECORD',
  line_id: 123
});

describe('sagas/cancelReservationSagaWorker', () => {
  it('calls axios.post to reservation/cancel', () => {
    expect(iterator.next().value).to.deep.equal(call(axios.post, '/reservation/cancel', {
      line_id: 123
    }));
  });

  it('dispatches RESERVATION_CANCEL_SUCCESSFUL', () => {
    expect(iterator.next({
      status: 200
    }).value).to.deep.equal(put({
      type: 'RESERVATION_CANCEL_SUCCESSFUL',
      message: 'You have successfully cancelled your reservation. We hope to travel with you soon.'
    }));
  });

  it('dispatches LINE_HASNT_RESERVED', () => {
    expect(iterator.next().value).to.deep.equal(put({
      type: 'LINE_HASNT_RESERVED'
    }));
  });

  it('dispatches RESERVATION_CANCEL_FAILED', () => {
    expect(iterator.throw({
      response: {
        status: 403
      }
    }).value).to.deep.equal(put({
      type: 'RESERVATION_CANCEL_FAILED',
      message: 'You must be logged in before you can make/cancel any reservations.'
    }));
  });
});