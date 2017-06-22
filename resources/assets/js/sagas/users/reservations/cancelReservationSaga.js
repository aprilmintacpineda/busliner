import { take, fork, put, call } from 'redux-saga/effects';
import axios from 'axios';

export function* cancelReservationSagaWorker(action) {
  try {
    let response = yield call(axios.post, '/reservation/cancel', {
      line_id: action.line_id
    });

    yield put({
      type: 'USER_RESERVATIONS_CANCEL_SUCCESSFUL',
      line_id: action.line_id,
      message: response.data
    });
  } catch(exception) {
    if(!exception.response && exception.message.toLowerCase() == 'network error') {
      yield put({
        type: 'USER_RESERVATIONS_CANCEL_FAILED',
        line_id: action.line_id,
        message: 'We couldn\'t connect to the server, please check your internet connection.'
      });
    } else if(exception.response.status == 403) {
      yield put({
        type: 'USER_RESERVATIONS_CANCEL_FAILED',
        line_id: action.line_id,
        message: 'You must be logged in before you can make/cancel any reservations.'
      });
    } else if(exception.response.status == 422) {
      yield put({
        type: 'USER_RESERVATIONS_CANCEL_FAILED',
        line_id: action.line_id,
        message: exception.response.data
      });
    } else {
      yield put({
        type: 'USER_RESERVATIONS_CANCEL_FAILED',
        line_id: action.line_id,
        message: 'We have encountered an unexpected error while processing your request. The server responded with the following `' + exception.response.status + ' : ' + exception.response.statusText + '`'
      });
    }
  }
}

export default function* cancelReservationSagaWatcher() {
  while(true) {
    let action = yield take('USER_RESERVATIONS_CANCEL_START');
    yield fork(cancelReservationSagaWorker, action);
  }
}