import 'babel-polyfill';

import { take, fork, call, put, select } from 'redux-saga/effects';
import axios from 'axios';
import { expect } from 'chai';

import { signUpSagaWorker } from '../../../sagas/signUpSaga';
import { formValues } from '../../../sagas/selectors/signUpSelectors';

let iterator = signUpSagaWorker();
let data = select(formValues);
let mockResponse = {
  status: 'successful'
}

describe('sagas/signUpSagaWorker', () => {
  it('yields the select formValues from signUpSelectors', () => {
    expect(iterator.next().value).to.deep.equal(select(formValues));
  });

  it('yields a call to the API', () => {
    expect(iterator.next(data).value).to.deep.equal(call(axios.post, '/sign-up', data));
  });

  it('yields a SEND_SUCCESSFUL action when completed', () => {
    expect(iterator.next(mockResponse).value).to.deep.equal(put({ type: 'SEND_SUCCESSFUL' }));
  });

  it('yields a SEND_FAILED action when failed', () => {
    let exception = {
      response: {
        status: 405,
        statusText: 'Method Not Allowed'
      }
    }

    expect(iterator.throw(exception).value).to.deep.equal(put({
      type: 'SEND_FAILED',
      message: 'We have encountered an unexpected error while processing your request. The server responded with the following `' + exception.response.status + ' : ' + exception.response.statusText + '`'
    }));
  });
});