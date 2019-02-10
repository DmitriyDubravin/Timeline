import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import { rootSaga } from './sagas';

import {
    user,
    date,
    popups,
    usersList
} from './reducers';

import eventsData from './reducers/events-data';

const reducers = combineReducers({
    user,
    date,
    popups,
    usersList,
    eventsData
});

const logger = createLogger({
    collapsed: true,
    duration: true,
    diff: true
});

const sagaMiddleware = createSagaMiddleware();

const preloadedState = {
    user: {
        name: undefined,
        token: undefined,
        isAuthorized: undefined
    },
    date: {
        year: null,
        month: null,
        day: null,
    },
    popups: {
        navMain: {
            show: false
        },
        navUser: {
            show: false
        },
        eventAdd: {
            show: false
        },
        eventEdit: {
            show: false,
            id: null
        },
        eventDelete: {
            show: false,
            id: null
        },
        userRegister: {
            show: false
        },
        userLogin: {
            show: false
        },
        datePicker: {
            show: false
        },
    },
    usersList: null,
}

const store = createStore(
    reducers,
    preloadedState,
    applyMiddleware(thunk, logger, sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

// const action = type => store.dispatch({type})

export default store;

