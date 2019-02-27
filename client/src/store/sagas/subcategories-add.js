import { call, put, select, takeEvery } from 'redux-saga/effects';
import AT from 'store/actions-types';
import actions from 'store/actions';
import QM from 'modules/QueryModule';

export const getUser = state => state.user;

export function* subcategoriesAddTask({payload}) {
    console.log('saga: getSubcategories');

    const { name } = yield select(getUser);

    const queryData = {
        author: name,
        category: payload
    };
    const {success, subcategoriesList} = yield call(QM.getSubcategories, queryData);
    if (success) {
        const sortedDataList = subcategoriesList.filter(item => item.length !== 0).sort();
        // console.log(sortedDataList);
        yield put(actions.subcategoriesAdd(sortedDataList));
    } else {
        // TODO: no errors handling
    }
}

export function* subcategoriesAddWatcher() {
    yield takeEvery(AT.SUBCATEGORIES_ADD_TASK, subcategoriesAddTask);
}
