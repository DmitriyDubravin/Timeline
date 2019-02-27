import { call, put, select, takeEvery } from 'redux-saga/effects';
import AT from 'store/actions-types';
import actions from 'store/actions';
import QM from 'modules/QueryModule';

export const getUser = state => state.user;
export const getDate = state => state.date;

export function* eventAddTask({payload}) {

    const { name } = yield select(getUser);
    const { format } = yield select(getDate);

    const queryData = {...payload, author: name};

    const {success, addedEvent} = yield call(QM.addEvent, queryData);
    if (success) {
        yield put(actions.togglePopupEventAdd({ show: false }));
        yield put(actions.eventAdd({
            range: format,
            event: addedEvent
        }));
    } else {
        // TODO!
        console.log('c%Adding Error', 'color: red');
    }
}

export function* eventAddWatcher() {
    yield takeEvery(AT.EVENT_ADD_TASK, eventAddTask);
}