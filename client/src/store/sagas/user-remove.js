import { call, put, select } from 'redux-saga/effects';
import actions from 'store/actions';
import QM from 'modules/QueryModule';
import UM from 'modules/UserModule';

export const getUser = state => state.user;

export function* userRemoveTask({payload}) {
    console.log('saga: userRemove');

    const { name } = yield select(getUser);

    const queryData = {
        login: name,
        password: payload.password
    }
    const {success} = yield call(QM.deleteUser, queryData);

    if (success) {
        yield put(actions.userAdd({
            name: false,
            token: false,
            isAuthorized: false
        }));
        UM.deleteToken();
    }
}
