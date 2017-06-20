import { take, put, fork, call } from 'redux-saga/effects';
import axios from 'axios';

export function* cancelReservationSagaWorker(action) {
  try {
    let response = yield call(axios.post, '/reservation/cancel', {
      line_id: action.line_id
    });

    yield put({
      type: 'RESERVATION_CANCEL_SUCCESSFUL',
      message: response.data
    });

    yield put({ type: 'LINE_HASNT_RESERVED' });
  } catch(exception) {
    if(!exception.response && exception.message.toLowerCase() == 'network error') {
      yield put({
        type: 'RESERVATION_CANCEL_FAILED',
        message: 'We couldn\'t connect to the server, please check your internet connection.'
      });
    } else if(exception.response.status == 403) {
      yield put({
        type: 'RESERVATION_CANCEL_FAILED',
        message: 'You must be logged in before you can make/cancel any reservations.'
      });
    } else {
      yield put({
        type: 'RESERVATION_CANCEL_FAILED',
        message: 'We have encountered an unexpected error while processing your request. The server responded with the following `' + exception.response.status + ' : ' + exception.response.statusText + '`'
      });
    }
  }
}

export default function* cancelReservationSagaWatcher() {
  while(true) {
    let action = yield take('RESERVATION_CANCEL_START');
    yield fork(cancelReservationSagaWorker, action);
  }
}