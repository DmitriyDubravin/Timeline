import { call, put, select } from 'redux-saga/effects';
import * as actions from './../actions';
import QM from './../../modules/QueryModule';

export const getUser = state => state.user;
export const getDate = state => state.date;

export function* eventRemoveTask({payload}) {

    const { name } = yield select(getUser);
    const { format } = yield select(getDate);

    const queryData = {
        author: name,
        _id: payload.eventId
    };
    const { success } = yield call(QM.removeEvent, queryData);
    if (success) {
        yield put(actions.eventRemove({
            range: format,
            eventId: payload.eventId
        }));
    } else {
        // TODO: no errors handling
    }

}