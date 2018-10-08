import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';

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
            show: true // TEMP
        },
        editEvent: {
            show: false,
            id: null
        },
        deleteEvent: {
            show: false,
            id: null
        }
    },
    usersList: null,
    eventsData: {
        ranges: {
            dates: {},
            queries: {}
        },
        events: {}
    }
}

export default createStore(
    reducers,
    preloadedState,
    applyMiddleware(thunk, logger)
);


