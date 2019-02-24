import { call, put } from 'redux-saga/effects';
import actions from 'store/actions';
import QM from 'modules/QueryModule';
import UM from 'modules/UserModule';

export function* userLoginTask({payload}) {
    console.log('saga: userLogin');

    const queryData = {
        login: payload.name,
        password: payload.password
    };

    const { success, cause, name, token } = yield call(QM.loginUser, queryData);
    // TODO: check UM for unsetUser function
    if (success) {
        yield put(actions.userAdd({
            name: name,
            token: token,
            isAuthorized: true
        }));
        UM.setToken(token);
        yield put(actions.togglePopupUserLogin({ show: false }));
    } else {
        if (cause === 'email') {
            // TODO
            // set global message about Email confirmation
        }
    }

}
