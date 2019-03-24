import { call, put, takeEvery } from 'redux-saga/effects';
import actions from 'store/actions';
import AT from 'store/actions-types';
import QM from 'modules/QueryModule';
import UM from 'modules/UserModule';
import MM from 'modules/MessageModule';

export function* userAddTask() {

    console.log('saga: userAddTask');

    const isToken = UM.checkToken();

    if (isToken) {

        const token = UM.getToken();
        const queryData = {
            token: token
        }
        const {status, data} = yield call(QM.userTokenCheck, queryData);

        if (status === 200) {
            yield put(actions.userAdd({
                name: data[0].name, // TODO: temp! unsafe!
                token: token,
                isAuthorized: true
            }))
            MM.tokenAcknowledgeSuccess().log();

        } else {
            yield put(actions.userLogoutTask());
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

export function* userAddTaskWatcher() {
    yield takeEvery(AT.USER_ADD_TASK, userAddTask)
}
