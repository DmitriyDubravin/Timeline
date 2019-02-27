import { call, takeEvery } from 'redux-saga/effects';
import AT from 'store/actions-types';
import QM from 'modules/QueryModule';
import MM from 'modules/MessageModule';

export function* userEmailConfirmTask({payload}) {

    console.log('saga: userEmailConfirm');

    const queryData = {
        hash: payload.hash
    };
    const {success} = yield call(QM.confirmEmail, queryData);

    const message = success
        ? MM.emailConfirmationSuccess().text
        : MM.emailConfirmationFailure().text;
    console.log(message);

}

export function* userEmailConfirmWatcher() {
    yield takeEvery(AT.USER_LOGIN_TASK, userEmailConfirmTask);
}
