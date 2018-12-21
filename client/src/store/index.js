import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import { rootSaga } from './sagas';

import {
    user,
    date,
    popups,
    usersList,
    eventsData
} from './reducers';

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
        login: {
            show: false
        },
        addEvent: {
            show: false
        },
        editEvent: {
            show: false,
            id: null
        },
        deleteEvent: {
            show: false,
            id: null
        },
        mainNav: {
            show: false
        },
        userNav: {
            show: false
        },
        datePicker: {
            show: false
        },
    },
    usersList: null,
    eventsData: {
        ranges: {},
        events: {}
    }
}

const store = createStore(
    reducers,
    preloadedState,
    applyMiddleware(thunk, logger, sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

// const action = type => store.dispatch({type})

export default store;

