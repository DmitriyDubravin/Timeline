
import { all, call, put, takeEvery, select } from 'redux-saga/effects';
import AT from './actions-types';
import * as action from './actions';
import QM from './../modules/QueryModule';
import UM from './../modules/UserModule';


import { eventAddTask } from './sagas/event-add';
import { eventEditTask } from './sagas/event-edit';
import { eventRemoveTask } from './sagas/event-remove';
import { eventsAddTask } from './sagas/events-add';
import { eventsSearchTask } from './sagas/events-search';
import { usersAddTask } from './sagas/users-add';

export const getUser = state => state.user;
export const getDate = state => state.date;


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

export function* userRegister({payload}) {
    console.log('saga: userRegister');

    const queryData = {
        login: payload.name,
        email: payload.email,
        password: payload.password
    };

    const {success} = yield call(QM.registerUser, queryData);
    if (success) {
        // TODO: handle global messages
    }

    yield put(action.togglePopupUserRegister({ show: false }));

}
export function* userLogin({payload}) {
    console.log('saga: userLogin');

    const queryData = {
        login: payload.name,
        password: payload.password
    };

    const { success, cause, name, token } = yield call(QM.loginUser, queryData);
    // TODO: check UM for unsetUser function
    if (success) {
        yield put(action.setUser({
            name: name,
            token: token,
            isAuthorized: true
        }));
        UM.setToken(token);
        yield put(action.togglePopupUserLogin({ show: false }));
    } else {
        if (cause === 'email') {
            // TODO
            // set global message about Email confirmation
        }
    }

}

export function* userPasswordChange({payload}) {
    console.log('saga: userPasswordChange');
    
    const { name } = yield select(getUser);

    const queryData = {
        login: name,
        currentPassword: payload.password,
        newPassword: payload.newPassword
    };
    const {success} = yield call(QM.changeUserPassword, queryData);

    if (success) {
        // TODO: reconsider logout after password changing
        yield put(action.setUser({
            name: false,
            token: false,
            isAuthorized: false
        }));
        UM.deleteToken();
    }
}

export function* userLogout() {
    console.log('saga: userLogout');

    // TODO: check UM for unsetUser function
    yield put(action.setUser({
        name: false,
        token: false,
        isAuthorized: false
    }));
    UM.deleteToken();
}

export function* userRemove({payload}) {
    console.log('saga: userRemove');

    const { name } = yield select(getUser);

    const queryData = {
        login: name,
        password: payload.password
    }
    const {success} = yield call(QM.deleteUser, queryData);

    if (success) {
        yield put(action.setUser({
            name: false,
            token: false,
            isAuthorized: false
        }));
        UM.deleteToken();
    }
}




export function* eventAddWatcher() {
    yield takeEvery(AT.EVENT_ADD_TASK, eventAddTask);
}
export function* eventEditWatcher() {
    yield takeEvery(AT.EVENT_EDIT_TASK, eventEditTask);
}
export function* eventRemoveWatcher() {
    yield takeEvery(AT.EVENT_REMOVE_TASK, eventRemoveTask);
}
export function* eventsAddWatcher() {
    yield takeEvery(AT.EVENTS_ADD_TASK, eventsAddTask);
}
export function* eventsSearchWatcher() {
    yield takeEvery(AT.EVENTS_SEARCH_TASK, eventsSearchTask);
}
export function* usersAddWatcher() {
    yield takeEvery(AT.USERS_ADD_TASK, usersAddTask);
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
export function* userRegisterWatcher() {
    yield takeEvery("USER_REGISTER", userRegister);
}
export function* userLoginWatcher() {
    yield takeEvery("USER_LOGIN", userLogin);
}
export function* userPasswordChangeWatcher() {
    yield takeEvery("USER_PASSWORD_CHANGE", userPasswordChange);
}
export function* userLogoutWatcher() {
    yield takeEvery("USER_LOGOUT", userLogout);
}
export function* userRemoveWatcher() {
    yield takeEvery("USER_REMOVE", userRemove);
}



export function* rootSaga() {
    yield all([
        eventAddWatcher(),
        eventEditWatcher(),
        eventRemoveWatcher(),
        eventsAddWatcher(),
        eventsSearchWatcher(),
        usersAddWatcher(),

        getTypesWatcher(),
        getCategoriesWatcher(),
        getSubcategoriesWatcher(),
        userRegisterWatcher(),
        userLoginWatcher(),
        userPasswordChangeWatcher(),
        userLogoutWatcher(),
        userRemoveWatcher(),

    ])
}
