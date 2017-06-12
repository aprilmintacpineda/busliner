import 'babel-polyfill';

import { expect } from 'chai';
import axios from 'axios';
import { call, put, select } from 'redux-saga/effects';

import { formValues } from '../../../sagas/selectors/signInSelectors';
import { signInSagaWorker } from '../../../sagas/signInSaga';

const iterator = signInSagaWorker();
const data = select(formValues);

describe('sagas/signInSagaWorker', () => {
  it('selects all the form data', () => {
    expect(iterator.next().value).to.deep.equal(select(formValues));
  });

  it('calls the API', () => {
    expect(iterator.next(data).value).to.deep.equal(call(axios.post, '/sign-in', data));
  });

  it('dispatches a SIGNIN_SEND_SUCCESSFUL and USER_LOGIN', () => {
    expect(iterator.next({
      data: {
        id: 1
      }
    }).value).to.deep.equal(put({ type: 'SIGNIN_SEND_SUCCESSFUL' }));

    expect(iterator.next().value).to.deep.equal(put({ type: 'USER_LOGIN', data: {
      id: 1
    } }));
  });

  it('dispatches a SIGNIN_SEND_FAILED', () => {
    // expect(iterator.throw({
    //   message: 'network error'
    // }).value).to.deep.equal(put({
    //   type: 'SIGNIN_SEND_FAILED',
    //   message: 'We couldn\'t connect to the server, please check your internet connection.'
    // }));

    expect(iterator.throw({
      response: {
        status: 422,
        data: {
          email: ['Email is invalid.']
        }
      }
    }).value).to.deep.equal(put({
      type: 'SIGNIN_SEND_FAILED',
      response: {
        email: ['Email is invalid.']
      }
    }));

    // expect(iterator.throw({
    //   status: 500,
    //   statusText: 'Internal server error.'
    // }).value).to.deep.equal(put({
    //   type: 'SIGNIN_SEND_FAILED',
    //   message: 'We have encountered an unexpected error while processing your request. The server responded with the following `500 : Internal server error.`'
    // }));
  });
});