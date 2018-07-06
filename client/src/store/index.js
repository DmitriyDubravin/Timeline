import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';

import {user, date, popup} from './reducers';



const reducers = combineReducers({
    user,
    date,
    popup
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
        isAuthorized: false
    },
    date: {
        year: null,
        month: null,
        day: null,
    },
    popup: {
        isLoginShown: false
    }
}

export default createStore(
    reducers,
    preloadedState,
    applyMiddleware(logger, thunk)
);


