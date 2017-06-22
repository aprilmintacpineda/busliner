import { take, put, fork, call, select } from 'redux-saga/effects';
import axios from 'axios';

import { getReservationListPage } from '../../selectors/userSelectors';

export function* fetchReservationSagaWorker() {
  try {
    let page = yield select(getReservationListPage);
    let response = yield call(axios.get, '/reservation/list/' + page);

    yield put({
      type: 'USER_RESERVATIONS_FETCH_SUCCESSFUL',
      data: response.data
    });
  } catch(exception) {
    if(!exception.response && exception.message.toLowerCase() == 'network error') {
      yield put({
        type: 'USER_RESERVATIONS_FETCH_FAILED',
        message: 'We couldn\'t connect to the server, please check your internet connection.'
      });
    } else if(exception.response.status == 403) {
      yield put({
        type: 'USER_RESERVATIONS_FETCH_FAILED',
        message: 'You must be logged in first.'
      });
    } else {
      yield put({
        type: 'USER_RESERVATIONS_FETCH_FAILED',
        message: 'We have encountered an unexpected error while processing your request. The server responded with the following `' + exception.response.status + ' : ' + exception.response.statusText + '`'
      });
    }
  }
}

export default function* fetchReservationSagaWatcher() {
  while(true) {
    yield take('USER_RESERVATIONS_FETCH_START');
    yield fork(fetchReservationSagaWorker);
  }
}