import 'babel-polyfill';
import { expect } from 'chai';
import { put, call, select } from 'redux-saga/effects';
import axios from 'axios';

import { lineSagaWorker } from '../../../sagas/lineSaga';
import { fetched } from '../../../sagas/selectors/lineSelectors';

const iterator = lineSagaWorker({
  type: 'LINE_FETCH_DATA_START',
  id: 123
});

describe('sagas/lineSagaWorker', () => {
  it('selects fetched', () => {
    expect(iterator.next().value).to.deep.equal(select(fetched));
  });

  it('calls axios.get to line/{id}', () => {
    expect(iterator.next(false).value).to.deep.equal(call(axios.get, '/line/123'));
  });

  it('dispatches LINE_FETCH_DATA_SUCCESSFUL', () => {
    expect(iterator.next({
      data: {
        id: 123,
        destination: 'Batangas'
      }
    }).value).to.deep.equal(put({
      type: 'LINE_FETCH_DATA_SUCCESSFUL',
      data: {
        id: 123,
        destination: 'Batangas'
      }
    }));
  });

  it('dispatches LINE_FETCH_DATA_FAILED', () => {
    expect(iterator.throw({
      response: {
        status: 500,
        statusText: 'Internal server error.'
      }
    }).value).to.deep.equal(put({
      type: 'LINE_FETCH_DATA_FAILED',
      message: 'We have encountered an unexpected error while processing your request. The server responded with the following `500 : Internal server error.`'
    }));
  });
});