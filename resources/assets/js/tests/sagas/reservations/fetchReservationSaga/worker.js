import 'babel-polyfill';
import { expect } from 'chai';
import { put, call, select } from 'redux-saga/effects';
import axios from 'axios';

import { fetchReservationSagaWorker } from '../../../../sagas/reservations/fetchReservationSaga';
import { getReservationListPage } from '../../../../sagas/selectors/userSelectors';

const iterator = fetchReservationSagaWorker();

describe('sagas/fetchReservationSagaWorker', () => {
  it('selects the reservation fetch page', () => {
    expect(iterator.next().value).to.deep.equal(select(getReservationListPage));
  });

  it('calls get method to /reservation/list', () => {
    expect(iterator.next(1).value).to.deep.equal(call(axios.get, '/reservation/list/1'));
  });

  it('dispatches USER_RESERVATIONS_FETCH_SUCCESSFUL', () => {
    expect(iterator.next({
      data: [
        { id: 1, name: 'test' }
      ]
    }).value).to.deep.equal(put({
      type: 'USER_RESERVATIONS_FETCH_SUCCESSFUL',
      data: [
        { id: 1, name: 'test' }
      ]
    }));
  });

  it('dispatches USER_RESERVATIONS_FETCH_FAILED', () => {
    expect(iterator.throw({
      response: {
        status: 403,
        statusText: 'Unauthorized.'
      }
    }).value).to.deep.equal(put({
      type: 'USER_RESERVATIONS_FETCH_FAILED',
        message: 'You must be logged in first.'
    }));
  });
});