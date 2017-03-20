import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import rootReducer from './rootReducer';

 const store = createStore(rootReducer, {}, applyMiddleware(ReduxThunk));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./rootReducer', () => {
      const nextRootReducer = require('./rootReducer');

      store.replaceReducer(nextRootReducer);
    });
}

export default store;
