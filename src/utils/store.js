/**
 * Created by itachi on 16/11/9.
 */

import loggerMiddleware from '../redux/middlewares/logger.js'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../redux/reducers/index.js'
import persistState from 'redux-localstorage'
import {compose, createStore, applyMiddleware} from 'redux'

const persistedReducers = [
    'train'
];

// 扩展createStore
var enhancerCreateStore = compose(
    persistState(persistedReducers)
)(applyMiddleware(
    loggerMiddleware,
    thunkMiddleware
)(createStore));

const store = enhancerCreateStore(rootReducer);

export default store;





