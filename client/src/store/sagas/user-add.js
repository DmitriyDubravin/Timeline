import { call, put } from 'redux-saga/effects';
import actions from 'store/actions';
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
        const {success, name} = yield call(QM.verifyToken, queryData);

        if (success) {
            yield put(actions.userAdd({
                name: name,
                token: token,
                isAuthorized: true
            }))
            // TODO: reconsider
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
