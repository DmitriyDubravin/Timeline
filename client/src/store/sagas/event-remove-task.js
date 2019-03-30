import { call, put, select, takeEvery } from 'redux-saga/effects';
import AT from 'store/actions-types';
import actions from 'store/actions';
import QM from 'modules/QueryModule';

export const getUser = state => state.user;
export const getDate = state => state.date;

export function* eventRemoveTask({payload}) {

    const { name } = yield select(getUser);
    const { format } = yield select(getDate);

    const queryData = {
        author: name,
        _id: payload.eventId
    };
    const { status } = yield call(QM.eventRemove, queryData);

    if (status === 200) {
        yield put(actions.eventRemove({
            range: format,
            eventId: payload.eventId
        }));
    } else {
        // TODO: no errors handling
    }
}

export function* eventRemoveTaskWatcher() {
    yield takeEvery(AT.EVENT_REMOVE_TASK, eventRemoveTask);
}
