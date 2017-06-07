import { compose, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

// reducers
import reducers from './reducers';
// sagas
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = (compose(
  applyMiddleware(sagaMiddleware),
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
)(createStore)(reducers));

sagaMiddleware.run(rootSaga);

export default store;