import 'babel-polyfill';

import { expect } from 'chai';
import { take, fork } from 'redux-saga/effects';

import signInSagaWatcher, { signInSagaWorker } from '../../../sagas/signInSaga';

const iterator = signInSagaWatcher();

describe('sagas/signInSagaWatcher', () => {
  it('watches for SIGNIN_SEND_START', () => {
    expect(iterator.next().value).to.deep.equal(take('SIGNIN_SEND_START'));
  });

  it('forks signInSagaWorker', () => {
    expect(iterator.next().value).to.deep.equal(fork(signInSagaWorker));
  });

  it('watches again for SIGNIN_SEND_START', () => {
    expect(iterator.next().value).to.deep.equal(take('SIGNIN_SEND_START'));
  });
});