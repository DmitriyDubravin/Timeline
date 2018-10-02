import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';

import {user, date, popups, eventsListings, usersList} from './reducers';



const reducers = combineReducers({
    user,
    date,
    popups,
    eventsListings,
    usersList
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
        isLoginShown: false,
        isEventAddShown: false
    },
    eventsListings: {},
    usersList: null
}

export default createStore(
    reducers,
    preloadedState,
    applyMiddleware(logger, thunk)
);


