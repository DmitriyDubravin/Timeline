import { call, put, select, takeEvery } from 'redux-saga/effects';
import AT from 'store/actions-types';
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

export function* userRemoveWatcher() {
    yield takeEvery(AT.USER_REMOVE_TASK, userRemoveTask);
}
