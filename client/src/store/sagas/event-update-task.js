import { call, put, select, takeEvery } from 'redux-saga/effects';
import AT from 'store/actions-types';
import actions from 'store/actions';
import QM from 'modules/QueryModule';

export const getUser = state => state.user;
export const getDate = state => state.date;

export function* eventUpdateTask({payload}) {

    const { name } = yield select(getUser);

    const queryData = {...payload, author: name};

    const { status, data } = yield call(QM.eventUpdate, queryData);

    if (status === 200) {
        yield put(actions.togglePopupEventEdit({ show: false }));
        yield put(actions.eventEdit({
            event: data
        }));
    } else {
        // TODO!
        console.log('c%Editing Error', 'color: red');
    }
}

export function* eventUpdateTaskWatcher() {
    yield takeEvery(AT.EVENT_UPDATE_TASK, eventUpdateTask);
}