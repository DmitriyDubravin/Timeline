import { call, put, takeEvery } from 'redux-saga/effects';
import AT from 'store/actions-types';
import actions from 'store/actions';
import QM from 'modules/QueryModule';

export function* userRegisterTask({payload}) {
    console.log('saga: userRegister');

    const queryData = {
        login: payload.name,
        email: payload.email,
        password: payload.password
    };

    const {success} = yield call(QM.registerUser, queryData);
    if (success) {
        // TODO: handle global messages
    }

    yield put(actions.togglePopupUserRegister({ show: false }));

}

export function* userRegisterWatcher() {
    yield takeEvery(AT.USER_REGISTER_TASK, userRegisterTask);
}
