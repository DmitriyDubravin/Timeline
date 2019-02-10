import { call, put, select } from 'redux-saga/effects';
import * as actions from '../actions';
import QM from '../../modules/QueryModule';

export const getUser = state => state.user;
export const getDate = state => state.date;

export function* eventsAddTask() {

    const {name} = yield select(getUser);
    const { dateStr, rangeStart, rangeFinish } = yield select(getDate);

    const queryData = {
        author: name,
        rangeName: dateStr,
        start: rangeStart,
        finish: rangeFinish
    };
    const { success, eventsList } = yield call(QM.getEvents, queryData);

    if (success) {
        yield put(actions.eventsAdd({
            range: dateStr,
            events: eventsList
        }));
    } else {
        // TODO: no errors handling
    }
}
