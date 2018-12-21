
import { all, call, put, takeEvery, select } from 'redux-saga/effects';
import * as action from './actions';
import QM from './../modules/QueryModule';

export const getUser = state => state.user;
export const getDate = state => state.date;

export function* getEvents() {

    const {name} = yield select(getUser);
    const { dateStr, rangeStart, rangeFinish } = yield select(getDate);

    const query = {
        author: name,
        rangeName: dateStr,
        start: rangeStart,
        finish: rangeFinish
    };
    const { success, eventsList } = yield call(QM.getEvents, query);

    if (success) {
        const events = {};
        eventsList.forEach(event => {
            events[event._id] = event;
        });
        yield put(action.addRangeEvents(dateStr, events));
    }
}
export function* getEventsWatcher() {
    yield takeEvery("GET_EVENTS", getEvents);
}

export function* rootSaga() {
    yield all([
        getEventsWatcher()
    ])
}
