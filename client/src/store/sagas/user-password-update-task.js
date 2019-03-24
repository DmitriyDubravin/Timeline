import { call, put, select, takeEvery } from 'redux-saga/effects';
import AT from 'store/actions-types';
import actions from 'store/actions';
import QM from 'modules/QueryModule';

export const getUser = state => state.user;

export function* userPasswordUpdateTask({payload}) {
    console.log('saga: userPasswordUpdateTask');
    
    const { name } = yield select(getUser);

    console.log(payload);

    const queryData = {
        login: name,
        password: payload.password,
        newPassword: payload.newPassword
    };
    const { status, data } = yield call(QM.userPasswordUpdate, queryData);
    console.log('response', data);

    if (status === 200) {
        // TODO: reconsider logout after password changing
        yield put(actions.userLogoutTask());
    }
}

export function* userPasswordUpdateTaskWatcher() {
    yield takeEvery(AT.USER_PASSWORD_UPDATE_TASK, userPasswordUpdateTask);
}
