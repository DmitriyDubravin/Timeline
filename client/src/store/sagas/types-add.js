import { call, put, select } from 'redux-saga/effects';
import actions from 'store/actions';
import QM from 'modules/QueryModule';

export const getUser = state => state.user;

export function* typesAddTask() {
    console.log('saga: getTypes');

    const { name } = yield select(getUser);

    const queryData = {
        author: name
    };
    const {success, typesList} = yield call(QM.getTypes, queryData);
    if (success) {
        const sortedDataList = typesList.filter(item => item.length !== 0).sort();
        // console.log(sortedDataList);
        yield put(actions.typesAdd(sortedDataList));
    } else {
        // TODO: no errors handling
    }
}
