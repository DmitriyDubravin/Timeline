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

    const {status, data} = yield call(QM.eventsGet, queryData);

    if (status === 200) {
        yield put(actions.eventsAdd({
            range: format,
            events: data
        }));
    } else {
        // TODO: no errors handling
    }
}

export function* eventsAddTaskWatcher() {
    yield takeEvery(AT.EVENTS_ADD_TASK, eventsAddTask);
}
