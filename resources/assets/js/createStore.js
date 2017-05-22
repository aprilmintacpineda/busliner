import { compose, createStore, applyMiddleware } from 'redux';

import reducers from './reducers';

export default (compose(
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
)(createStore)(reducers));