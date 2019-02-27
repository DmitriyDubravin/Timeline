import { call, put, select, takeEvery } from 'redux-saga/effects';
import AT from 'store/actions-types';
import actions from 'store/actions';
import QM from 'modules/QueryModule';

export const getUser = state => state.user;
export const getDate = state => state.date;

export function* eventsSearchTask({payload}) {

    const { name } = yield select(getUser);
    const queryData = {
        author: name,
    };

    const {success, eventsList} = yield call(QM.search, payload.query, queryData);

    if (success) {
        yield put(actions.eventsAdd({
            range: payload.query,
            events: eventsList
        }));
    }

}

export function* eventsSearchWatcher() {
    yield takeEvery(AT.EVENTS_SEARCH_TASK, eventsSearchTask);
}
