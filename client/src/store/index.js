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
        date: "01.05.2018"
    }
}

export default createStore(
    reducers,
    preloadedState,
    applyMiddleware(logger, thunk)
);


