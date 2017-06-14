import 'babel-polyfill';
import { expect } from 'chai';
import { take, fork } from 'redux-saga/effects';

import lineSagaWatcher, { lineSagaWorker } from '../../../sagas/lineSaga';

const iterator = lineSagaWatcher();

describe('sagas/lineSagaWatcher', () => {
  it('watches for LINE_FETCH_DATA_START', ()=> {
    expect(iterator.next().value).to.deep.equal(take('LINE_FETCH_DATA_START'));
  });

  it('forks lineSagaWorker', () => {
    expect(iterator.next({
      type: 'LINE_FETCH_DATA_START',
      id: 1
    }).value).to.deep.equal(fork(lineSagaWorker, {
      type: 'LINE_FETCH_DATA_START',
      id: 1
    }));
  });

  it('watches again for LINE_FETCH_DATA_START', ()=> {
    expect(iterator.next().value).to.deep.equal(take('LINE_FETCH_DATA_START'));
  });
});