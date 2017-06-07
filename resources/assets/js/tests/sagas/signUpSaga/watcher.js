import 'babel-polyfill';

import { take, fork, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { expect } from 'chai';

import { signUpSagaWorker } from '../../../sagas/signUpSaga';
import signUpSagaWatcher from '../../../sagas/signUpSaga';

let iterator = signUpSagaWatcher();

describe('sagas/signUpSagaWatcher', () => {
  it('watches for SEND_START action to be dispatched', () => {
    expect(iterator.next().value).to.deep.equal(take('SEND_START'));
  });

  it('forks the worker when an action was received', () => {
    let action = {
      type: 'SEND_START'
    }

    expect(iterator.next(action).value).to.deep.equal(fork(signUpSagaWorker, action));
  });

  it('watches AGAIN for SEND_START action to be dispatched', () => {
    expect(iterator.next().value).to.deep.equal(take('SEND_START'));
  });
});