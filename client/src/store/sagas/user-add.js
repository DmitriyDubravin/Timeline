import { call, put, takeEvery } from 'redux-saga/effects';
import actions from 'store/actions';
import AT from 'store/actions-types';
import QM from 'modules/QueryModule';
import UM from 'modules/UserModule';
import MM from 'modules/MessageModule';

export function* userAddTask() {

    console.log('saga: setUser');

    const isToken = UM.checkToken();

    if (isToken) {

        const token = UM.getToken();
        const queryData = {
            token: token
        }
        const {success, name} = yield call(QM.userTokenCheck, queryData);

        if (success) {
            yield put(actions.userAdd({
                name: name,
                token: token,
                isAuthorized: true
            }))
            MM.tokenAcknowledgeSuccess().log();

        } else {
            yield put(actions.userAdd({
                name: false,
                token: false,
                isAuthorized: false
            }))
            UM.deleteToken();
            MM.tokenAcknowledgeFailure().log();
        }
    } else {
        yield put(actions.userAdd({
            name: false,
            token: false,
            isAuthorized: false
        }))
        MM.userIsGuest().log();
    }
}

export function* userAddWatcher() {
    yield takeEvery(AT.USER_ADD_TASK, userAddTask)
}
