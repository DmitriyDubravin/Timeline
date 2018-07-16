import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';

import {user, date, popup, eventsListings} from './reducers';



const reducers = combineReducers({
    user,
    date,
    popup,
    eventsListings
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
    popup: {
        isLoginShown: false
    },
    eventsListings: {}
}

export default createStore(
    reducers,
    preloadedState,
    applyMiddleware(logger, thunk)
);


