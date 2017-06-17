import { expect } from 'chai';
import { put, call, select } from 'redux-saga/effects';
import axios from 'axios';

import { reservationSagaWorker } from '../../../sagas/reservationSaga';
import { getSeatsValue } from '../../../sagas/selectors/reservationSelectors';

const iterator = reservationSagaWorker();

describe('sagas/reservationSagaWorker', () => {
  it('selects the seats value', () => {
    expect(iterator.next().value).to.deep.equal(select(getSeatsValue));
  });

  it('call the axios.post to the api', () => {
    expect(iterator.next(3).value).to.deep.equal(call(axios.post, '/reservation/make', { seats: 3 }));
  });

  it('dispatches RESERVATION_SEND_SUCCESSFUL', () => {
    expect(iterator.next({
      data: 'blah blah blah'
    }).value).to.deep.equal(put({ type: 'RESERVATION_SEND_SUCCESSFUL', message: 'blah blah blah' }));
  });

  it('dispatches LINE_HAS_RESERVED', () => {
    expect(iterator.next().value).to.deep.equal(put({ type: 'LINE_HAS_RESERVED' }));
  });

  it('dispatches RESERVATION_SEND_FAILED on failure', () => {
    expect(iterator.throw({
      response: {
        status: 500,
        statusText: 'Internal server error.'
      }
    }).value).to.deep.equal(put({
      type: 'RESERVATION_SEND_FAILED',
      message: 'We have encountered an unexpected error while processing your request. The server responded with the following `500 : Internal server error.`'
    }));
  });
});