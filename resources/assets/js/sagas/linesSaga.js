import { call, put, fork, select, take } from 'redux-saga/effects';
import axios from 'axios';

import { currentPage } from './selectors/linesSelectors';

export function* linesSagaWorker() {
  try {
    let page = yield select(currentPage);
    let response = yield call(axios.get, '/lines/' + page);
    yield put({ type: 'LINES_FETCH_DATA_SUCCESSFUL', data: [...response.data] });
  } catch(exception) {
    if(!exception.response && exception.message.toLowerCase() == 'network error') {
      yield put({
        type: 'LINES_FETCH_DATA_FAILED',
        message: 'We couldn\'t connect to the server, please check your internet connection.'
      });
    } else {
      yield put({
        type: 'LINES_FETCH_DATA_FAILED',
        message: 'We have encountered an unexpected error while processing your request. The server responded with the following `' + exception.response.status + ' : ' + exception.response.statusText + '`'
      });
    }
  }
}

export default function* linesSagaWatcher() {
  while(true) {
    yield take('LINES_FETCH_DATA_START');
    yield fork(linesSagaWorker);
  }
}