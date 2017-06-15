import { take, put, select, fork, call } from 'redux-saga/effects';
import axios from 'axios';

import { getSeatsValue } from './selectors/reservationSelectors';

export function* reservationSagaWorker() {
  try {
    let seats = yield select(getSeatsValue);
    let response = yield call(axios.post, '/reserve', { seats });
    yield put({
      type: 'RESERVATION_SEND_SUCCESSFUL',
      message: response.data
    });
    yield put({ type: 'LINE_HAS_RESERVED' });
  } catch(exception) {
    if(!exception.response && exception.message.toLowerCase() == 'network error') {
      yield put({
        type: 'RESERVATION_SEND_FAILED',
        message: 'We couldn\'t connect to the server, please check your internet connection.'
      });
    } else {
      yield put({
        type: 'RESERVATION_SEND_FAILED',
        message: 'We have encountered an unexpected error while processing your request. The server responded with the following `' + exception.response.status + ' : ' + exception.response.statusText + '`'
      });
    }
  }
}

export default function* reservationSagaWatcher() {
  while(true) {
    yield take('RESERVATION_SEND_START');
    yield fork(reservationSagaWorker);
  }
}