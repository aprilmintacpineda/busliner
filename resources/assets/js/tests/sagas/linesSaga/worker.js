import { expect } from 'chai';
import axios from 'axios';
import { put, call, select } from 'redux-saga/effects';

import { currentPage } from '../../../sagas/selectors/linesSelectors';
import { linesSagaWorker } from '../../../sagas/linesSaga';

const iterator = linesSagaWorker();

describe('sagas/linesSagaWorker', () => {
  it('calls to currentPage selector', () => {
    expect(iterator.next().value).to.deep.equal(select(currentPage));
  });

  it('calls to axios.get', () => {
    expect(iterator.next(1).value).to.deep.equal(call(axios.get, '/lines/1'));
  });

  it('dispatches LINES_FETCH_DATA_SUCCESSFUL when successful', () => {
    expect(iterator.next({
      data: [{
        id: 1
      }]
    }).value).to.deep.equal(put({ type: 'LINES_FETCH_DATA_SUCCESSFUL', data: [{
      id: 1
    }] }));
  });

  it('dispatches LINES_FETCH_DATA_FAILED when failed', () => {
    expect(iterator.throw({
      response: {
        status: '500',
        statusText: 'Internal server error.'
      }
    }).value).to.deep.equal(put({
      type: 'LINES_FETCH_DATA_FAILED',
      message: 'We have encountered an unexpected error while processing your request. The server responded with the following `500 : Internal server error.`'
    }));
  });
});