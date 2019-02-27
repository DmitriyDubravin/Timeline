import { call, put, select, takeEvery } from 'redux-saga/effects';
import AT from 'store/actions-types';
import actions from 'store/actions';
import QM from 'modules/QueryModule';

export const getUser = state => state.user;
export const getDate = state => state.date;

export function* eventsAddTask() {

    const {name} = yield select(getUser);
    const { format, start, finish } = yield select(getDate);

    const queryData = {
        author: name,
        rangeName: format,
        start,
        finish
    };

    const { success, eventsList } = yield call(QM.getEvents, queryData);

    if (success) {
        yield put(actions.eventsAdd({
            range: format,
            events: eventsList
        }));
    } else {
        // TODO: no errors handling
    }
}

export function* eventsAddWatcher() {
    yield takeEvery(AT.EVENTS_ADD_TASK, eventsAddTask);
}
