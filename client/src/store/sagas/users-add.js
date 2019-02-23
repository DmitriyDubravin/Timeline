import { call, put } from 'redux-saga/effects';
import * as actions from 'store/actions';
import QM from 'modules/QueryModule';

export function* usersAddTask() {

    const {success, usersList} = yield call(QM.getUsers);
    if (success) {
        console.log(9, usersList);
        yield put(actions.usersAdd({usersList}));
    } else {
        // TODO!
        console.log('c%Adding Error', 'color: red');
    }
}
