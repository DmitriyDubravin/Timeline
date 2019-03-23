import { call, put, takeEvery } from 'redux-saga/effects';
import AT from 'store/actions-types';
import actions from 'store/actions';
import QM from 'modules/QueryModule';
import UM from 'modules/UserModule';

export function* userLoginTask({payload}) {
    console.log('saga: userLogin');

    const queryData = {
        login: payload.name,
        password: payload.password
    };

    const { status, data } = yield call(QM.userLogin, queryData);

    if (status === 200) {
        yield put(actions.userAdd({
            name: data.name,
            token: data.token,
            isAuthorized: true
        }));
        UM.setToken(data.token);
        yield put(actions.togglePopupUserLogin({ show: false }));
    } else {

        console.log(status, data);
        // TODO
        // set global message from response

        yield put(actions.userAdd({
            name: false,
            token: false,
            isAuthorized: false
        }))
    }
}

export function* userLoginWatcher() {
    yield takeEvery(AT.USER_LOGIN_TASK, userLoginTask);
}
