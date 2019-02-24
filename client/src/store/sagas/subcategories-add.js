import { call, put, select } from 'redux-saga/effects';
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
