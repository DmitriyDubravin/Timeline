import { call, put, select } from 'redux-saga/effects';
import * as actions from 'store/actions';
import QM from 'modules/QueryModule';

export const getUser = state => state.user;
export const getDate = state => state.date;

export function* eventEditTask({payload}) {

    const { name } = yield select(getUser);

    const queryData = {...payload, author: name};

    const {success, updatedEvent} = yield call(QM.editEvent, queryData);
    if (success) {
        yield put(actions.togglePopupEventEdit({ show: false }));
        yield put(actions.eventEdit({
            event: updatedEvent
        }));
    } else {
        // TODO!
        console.log('c%Editing Error', 'color: red');
    }
}
