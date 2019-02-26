import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import reducers from 'store/reducers';
import { rootSaga } from 'store/sagas';

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

export default store;
