import { call, put, select, takeEvery } from 'redux-saga/effects';
import AT from 'store/actions-types';
import actions from 'store/actions';
import QM from 'modules/QueryModule';

export const getUser = state => state.user;

export function* typesAddTask() {
    console.log('saga: getTypes');

    const { name } = yield select(getUser);

    const queryData = {
        author: name
    };
    const {status, data} = yield call(QM.typesGet, queryData);

    if (status === 200) {
        const sortedDataList = data.filter(item => item.length !== 0).sort(); // TODO: this could be done on server side ?
        yield put(actions.typesAdd(sortedDataList));
    } else {
        // TODO: no errors handling
    }
}

export function* typesAddTaskWatcher() {
    yield takeEvery(AT.TYPES_ADD_TASK, typesAddTask);
}
