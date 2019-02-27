import { call, put, takeEvery } from 'redux-saga/effects';
import AT from 'store/actions-types';
import actions from 'store/actions';
import QM from 'modules/QueryModule';

export function* usersAddTask() {

    const {success, usersList} = yield call(QM.getUsers);
    if (success) {
        yield put(actions.usersAdd({usersList}));
    } else {
        // TODO!
        console.log('c%Adding Error', 'color: red');
    }
}

export function* usersAddWatcher() {
    yield takeEvery(AT.USERS_ADD_TASK, usersAddTask);
}
