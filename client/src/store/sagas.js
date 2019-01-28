
import { all, call, put, takeEvery, select } from 'redux-saga/effects';
import * as action from './actions';
import QM from './../modules/QueryModule';
import UM from './../modules/UserModule';

export const getUser = state => state.user;
export const getDate = state => state.date;

export function* getEvents() {
    console.log('saga: getEvents');

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
        const events = {};
        eventsList.forEach(event => {
            events[event._id] = event;
        });
        yield put(action.addRangeEvents(dateStr, events));
    } else {
        // TODO: no errors handling
    }
}
export function* deleteEvent({eventId}) {
    console.log('saga: deleteEvent');

    const { name } = yield select(getUser);
    const { dateStr } = yield select(getDate);

    const queryData = {
        author: name,
        _id: eventId
    };
    const {success} = yield call(QM.removeEvent, queryData);
    if (success) {
        yield put(action.removeEvent(dateStr, eventId));
    } else {
        // TODO: no errors handling
    }

}

export function* getTypes() {
    console.log('saga: getTypes');

    const { name } = yield select(getUser);

    const queryData = {
        author: name
    };
    const {success, typesList} = yield call(QM.getTypes, queryData);
    if (success) {
        const sortedDataList = typesList.filter(item => item.length !== 0).sort();
        // console.log(sortedDataList);
        yield put(action.setTypes(sortedDataList));
    } else {
        // TODO: no errors handling
    }
}

export function* getCategories({payload}) {
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
        yield put(action.setCategories(sortedDataList));
    } else {
        // TODO: no errors handling
    }
}

export function* getSubcategories({payload}) {
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
        yield put(action.setSubcategories(sortedDataList));
    } else {
        // TODO: no errors handling
    }
}

export function* addEvent({payload}) {
    console.log('saga: addEvent');

    const { name } = yield select(getUser);
    const { dateStr } = yield select(getDate);

    const queryData = {...payload, author: name};


    const {success, addedEvent} = yield call(QM.addEvent, queryData);
    if (success) {
        const { _id } = addedEvent;
        yield put(action.togglePopupEventAdd({ show: false }));
        yield put(action.eventAdded(dateStr, {[_id]: addedEvent}));
    } else {
        // TODO!
        console.log('c%Adding Error', 'color: red');
    }
}

export function* editEvent({payload}) {
    console.log('saga: editEvent');

    const { name } = yield select(getUser);

    const queryData = {...payload, author: name};

    const {success, updatedEvent} = yield call(QM.editEvent, queryData);
    if (success) {
        const { _id } = updatedEvent;
        yield put(action.togglePopupEventEdit({ show: false }));
        yield put(action.eventEdited({[_id]: updatedEvent}));
    } else {
        // TODO!
        console.log('c%Editing Error', 'color: red');
    }
}

export function* userLogout({}) {
    console.log('saga: userLogout');

    // TODO: check UM for unsetUser function
    put(action.setUser({
        name: false,
        token: false,
        isAuthorized: false
    }));
    UM.deleteToken();
}




export function* getEventsWatcher() {
    yield takeEvery("GET_EVENTS", getEvents);
}
export function* deleteEventWatcher() {
    yield takeEvery("DELETE_EVENT", deleteEvent);
}
export function* getTypesWatcher() {
    yield takeEvery("GET_TYPES", getTypes);
}
export function* getCategoriesWatcher() {
    yield takeEvery("GET_CATEGORIES", getCategories);
}
export function* getSubcategoriesWatcher() {
    yield takeEvery("GET_SUBCATEGORIES", getSubcategories);
}
export function* addEventWatcher() {
    yield takeEvery("ADD_EVENT", addEvent);
}
export function* editEventWatcher() {
    yield takeEvery("EDIT_EVENT", editEvent);
}
export function* userLogoutWatcher() {
    yield takeEvery("USER_LOGOUT", userLogout);
}



export function* rootSaga() {
    yield all([
        getEventsWatcher(),
        deleteEventWatcher(),
        getTypesWatcher(),
        getCategoriesWatcher(),
        getSubcategoriesWatcher(),
        addEventWatcher(),
        editEventWatcher(),
        userLogoutWatcher()
    ])
}
