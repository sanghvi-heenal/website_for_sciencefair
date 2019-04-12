import {applyMiddleware, combineReducers, createStore} from 'redux';
import logger from 'redux-logger';

import displayReducer from './reducers/displayReducer';
import displayreducer2 from './reducers/displayreducer2' ;
// import reducer2 from './reducers/displayreducer2';

export default createStore(
    combineReducers({display: displayReducer, firstlast : displayreducer2}),
    {},
    applyMiddleware(logger)
);