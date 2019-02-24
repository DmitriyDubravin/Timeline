import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import { rootSaga } from './sagas';

import date from './reducers/date';
import eventsData from './reducers/events';
import usersList from './reducers/users';
import user from './reducers/user';
import popups from './reducers/popups';

const reducers = combineReducers({
    date,
    popups,
    eventsData,
    usersList,
    user
});

const logger = createLogger({
    collapsed: true,
    duration: true,
    diff: true
});

const sagaMiddleware = createSagaMiddleware();


const store = createStore(
    reducers,
    {},
    applyMiddleware(thunk, logger, sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

// const action = type => store.dispatch({type})

export default store;
