import { call, put, takeEvery } from 'redux-saga/effects';
import AT from 'store/actions-types';
import actions from 'store/actions';
import QM from 'modules/QueryModule';

export function* userCreateTask({payload}) {
    console.log('saga: userCreateTask');

    const queryData = {
        login: payload.name,
        email: payload.email,
        password: payload.password
    };

    const resp = yield call(QM.userCreate, queryData);
    console.log(resp);
    // if (success) {
    //     // TODO: handle global messages
    // }

    yield put(actions.togglePopupUserRegister({ show: false }));

}

export function* userCreateTaskWatcher() {
    yield takeEvery(AT.USER_CREATE_TASK, userCreateTask);
}
