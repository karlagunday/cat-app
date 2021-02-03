/**
 * Defines the store
 */

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// @TODO - add support for combining all reducers automatically
import imageReducer from './image/state/imageReducer';
const store = createStore(imageReducer, applyMiddleware(thunk));

export default store;
