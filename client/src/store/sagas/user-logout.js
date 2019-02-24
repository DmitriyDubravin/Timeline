import { put } from 'redux-saga/effects';
import actions from 'store/actions';
import UM from 'modules/UserModule';

export function* userLogoutTask() {
    console.log('saga: userLogout');

    // TODO: check UM for unsetUser function
    yield put(actions.userAdd({
        name: false,
        token: false,
        isAuthorized: false
    }));
    UM.deleteToken();
}

