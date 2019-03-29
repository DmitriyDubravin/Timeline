import { call, put, takeEvery } from 'redux-saga/effects';
import AT from 'store/actions-types';
import actions from 'store/actions';
import QM from 'modules/QueryModule';

export function* usersAddTask() {

    const { status, data } = yield call(QM.usersGet);

    if (status === 200) {
        yield put(actions.usersAdd({data}));
    } else {
        // TODO!
        console.log('c%Adding Error', 'color: red');
    }
}

export function* usersAddWatcher() {
    yield takeEvery(AT.USERS_ADD_TASK, usersAddTask);
}
