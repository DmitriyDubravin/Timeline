import { call, put, select, takeEvery } from 'redux-saga/effects';
import AT from 'store/actions-types';
import actions from 'store/actions';
import QM from 'modules/QueryModule';

export const getUser = state => state.user;
export const getDate = state => state.date;

export function* eventCreateTask({payload}) {

    const { name, token } = yield select(getUser);
    const { format } = yield select(getDate);

    const queryData = {...payload, author: name, token: token};

    const {status, data} = yield call(QM.eventCreate, queryData);

    if (status === 200) {
        yield put(actions.togglePopupEventAdd({ show: false }));
        yield put(actions.eventAdd({
            range: format,
            event: data
        }));
    } else {
        // TODO!
        console.log('c%Adding Error', 'color: red');
    }
}

export function* eventCreateTaskWatcher() {
    yield takeEvery(AT.EVENT_CREATE_TASK, eventCreateTask);
}