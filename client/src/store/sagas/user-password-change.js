import { call, put, select } from 'redux-saga/effects';
import actions from 'store/actions';
import QM from 'modules/QueryModule';
import UM from 'modules/UserModule';

export const getUser = state => state.user;

export function* userPasswordChangeTask({payload}) {
    console.log('saga: userPasswordChange');
    
    const { name } = yield select(getUser);

    const queryData = {
        login: name,
        currentPassword: payload.password,
        newPassword: payload.newPassword
    };
    const {success} = yield call(QM.changeUserPassword, queryData);

    if (success) {
        // TODO: reconsider logout after password changing
        yield put(actions.userAdd({
            name: false,
            token: false,
            isAuthorized: false
        }));
        UM.deleteToken();
    }
}

