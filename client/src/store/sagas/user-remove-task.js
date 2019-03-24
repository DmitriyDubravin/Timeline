import { call, put, select, takeEvery } from 'redux-saga/effects';
import AT from 'store/actions-types';
import actions from 'store/actions';
import QM from 'modules/QueryModule';

export const getUser = state => state.user;

export function* userRemoveTask({payload}) {
    console.log('saga: userRemoveTask');

    const { name } = yield select(getUser);

    const queryData = {
        login: name,
        password: payload
    }
    const resp = yield call(QM.userRemove, queryData);
    console.log(resp);
    const {status} = resp;

    if (status === 200) {
        yield put(actions.userLogoutTask());
    }
}

export function* userRemoveTaskWatcher() {
    yield takeEvery(AT.USER_REMOVE_TASK, userRemoveTask);
}
