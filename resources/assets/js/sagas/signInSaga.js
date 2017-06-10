import { take, put, select, fork, call } from 'redux-saga/effects';
import axios from 'axios';

import { formValues } from './selectors/signInSelectors';

export function* signInSagaWorker(action) {
  try {
    let data = yield select(formValues);
    let response = yield call(axios.post, '/sign-in', data);
    yield put({ type: 'SIGNIN_SEND_SUCCESSFUL' });
    yield put({ type: 'USER_LOGIN' });
  } catch(exception) {
    if(!exception.response && exception.message.toLowerCase() == 'network error') {
        yield put({
        type: 'SIGNIN_SEND_FAILED',
        message: 'We couldn\'t connect to the server, please check your internet connection.'
      });
    } else if(exception.response.status == 422) {
      yield put({
        type: 'SIGNIN_SEND_FAILED',
        response: {...exception.response.data}
      });
    } else {
      yield put({
        type: 'SIGNIN_SEND_FAILED',
        message: 'We have encountered an unexpected error while processing your request. The server responded with the following `' + exception.response.status + ' : ' + exception.response.statusText + '`'
      });
    }
  }
}

export default function* signInSagaWatcher() {
  while(true) {
    yield take('SIGNIN_SEND_START');
    yield fork(signInSagaWorker);
  }
}