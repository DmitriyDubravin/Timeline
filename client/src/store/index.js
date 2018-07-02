import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';

import {user, date} from './reducers';



const reducers = combineReducers({
    user,
    date
});

const logger = createLogger({
    collapsed: true,
    duration: true,
    diff: true
});

const preloadedState = {
    user: {
        name: undefined
    },
    date: {
        year: null,
        month: null,
        day: null,
    }
}

export default createStore(
    reducers,
    preloadedState,
    applyMiddleware(logger, thunk)
);


