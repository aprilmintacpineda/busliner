import { take, fork, call, put, select } from 'redux-saga/effects';
import axios from 'axios';

import { fetched } from './selectors/lineSelectors';

export function* lineSagaWorker(action) {
  try {
    let hasFetched = yield select(fetched);

    if(!hasFetched) {
      let response = yield call(axios.get, '/line/' + action.id);
      yield put({
        type: 'LINE_FETCH_DATA_SUCCESSFUL',
        data: {...response.data}
      });
    }
  } catch(exception) {
    if(!exception.response && exception.message.toLowerCase() == 'network error') {
      yield put({
        type: 'LINE_FETCH_DATA_FAILED',
        message: 'We couldn\'t connect to the server, please check your internet connection.'
      });
    } else if(exception.response.status == 404) {
      yield put({
        type: 'LINE_FETCH_DATA_FAILED',
        message: 404
      });
    } else {
      yield put({
        type: 'LINE_FETCH_DATA_FAILED',
        message: 'We have encountered an unexpected error while processing your request. The server responded with the following `' + exception.response.status + ' : ' + exception.response.statusText + '`'
      });
    }
  }
}

export default function* lineSagaWatcher() {
  while(true) {
    let action = yield take('LINE_FETCH_DATA_START');
    yield fork(lineSagaWorker, action);
  }
}