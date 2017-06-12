import 'babel-polyfill';

import { expect } from 'chai';
import { fork, take } from 'redux-saga/effects';

import linesSagaWatcher, { linesSagaWorker } from '../../../sagas/linesSaga';

const iterator = linesSagaWatcher();

describe('sagas/linesSagaWatcher', () => {
  it('watches from LINES_FETCH_DATA_START', () => {
    expect(iterator.next().value).to.deep.equal(take('LINES_FETCH_DATA_START'));
  });

  it('forks linesSagaWorker', () => {
    expect(iterator.next().value).to.deep.equal(fork(linesSagaWorker));
  });

  it('watches for LINES_FETCH_DATA_START again', () => {
    expect(iterator.next().value).to.deep.equal(take('LINES_FETCH_DATA_START'));
  });
});