import { legacy_createStore as createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import { workspaceReducer } from './reducers/workspaceReducer';
import { userReducer } from './reducers/userReducer';
import { bookingReducer } from './reducers/bookingReducer';

const rootReducer = combineReducers({
  workspace: workspaceReducer,
  user: userReducer,
  booking: bookingReducer,
});

const middleware = [thunk];

// Use composeWithDevTools only if available
const composeEnhancer =
  (process.env.NODE_ENV === 'development' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(...middleware))
);


export default store;
