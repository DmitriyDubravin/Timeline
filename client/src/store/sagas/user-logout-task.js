import { put, takeEvery } from 'redux-saga/effects';
import AT from 'store/actions-types';
import actions from 'store/actions';
import UM from 'modules/UserModule';

export function* userLogoutTask() {
    console.log('saga: userLogoutTask');

    // TODO: check UM for unsetUser function
    yield put(actions.userAdd({
        name: false,
        token: false,
        isAuthorized: false
    }));
    UM.deleteToken();
}

export function* userLogoutTaskWatcher() {
    yield takeEvery(AT.USER_LOGOUT_TASK, userLogoutTask);
}
