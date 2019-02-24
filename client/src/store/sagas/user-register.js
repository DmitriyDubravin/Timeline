import { call, put } from 'redux-saga/effects';
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
