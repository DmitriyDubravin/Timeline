import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';

import {user} from './reducers';



const reducers = combineReducers({
    user,
});

const logger = createLogger({
    collapsed: true,
    duration: true,
    diff: true
});

const preloadedState = {
    user: {
        name: undefined
    }
}

export default createStore(
    reducers,
    preloadedState,
    applyMiddleware(logger, thunk)
);


