/**
 * Defines the store
 */

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// @TODO - add support for combining all reducers automatically
import catReducer from './cat/state/catReducer';
const store = createStore(catReducer, applyMiddleware(thunk));

export default store;
