import { call, put, select } from 'redux-saga/effects';
import actions from 'store/actions';
import QM from 'modules/QueryModule';

export const getUser = state => state.user;

export function* categoriesAddTask({payload}) {
    console.log('saga: getCategories');

    const { name } = yield select(getUser);

    const queryData = {
        author: name,
        type: payload
    };
    const {success, categoriesList} = yield call(QM.getCategories, queryData);
    if (success) {
        const sortedDataList = categoriesList.filter(item => item.length !== 0).sort();
        // console.log(sortedDataList);
        yield put(actions.categoriesAdd(sortedDataList));
    } else {
        // TODO: no errors handling
    }
}
