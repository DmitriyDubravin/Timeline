import { call, put, select } from 'redux-saga/effects';
import * as actions from '../actions';
import QM from '../../modules/QueryModule';

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
