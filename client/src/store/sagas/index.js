import { all, takeEvery } from 'redux-saga/effects';
import AT from 'store/actions-types';

import { eventAddTask } from './event-add';
import { eventEditTask } from './event-edit';
import { eventRemoveTask } from './event-remove';
import { eventsAddTask } from './events-add';
import { eventsSearchTask } from './events-search';
import { userAddTask } from './user-add';
import { usersAddTask } from './users-add';
import { userRegisterTask } from './user-register';
import { userLoginTask } from './user-login';
import { userRemoveTask } from './user-remove';
import { userLogoutTask } from './user-logout';
import { userPasswordChangeTask } from './user-password-change';
import { typesAddTask } from './types-add';
import { categoriesAddTask } from './categories-add';
import { subcategoriesAddTask } from './subcategories-add';

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
export function* userAddWatcher() {
    yield takeEvery(AT.USER_ADD_TASK, userAddTask)
}
export function* userRegisterWatcher() {
    yield takeEvery(AT.USER_REGISTER_TASK, userRegisterTask);
}
export function* userLoginWatcher() {
    yield takeEvery(AT.USER_LOGIN_TASK, userLoginTask);
}
export function* userRemoveWatcher() {
    yield takeEvery(AT.USER_REMOVE_TASK, userRemoveTask);
}
export function* userLogoutWatcher() {
    yield takeEvery(AT.USER_LOGOUT_TASK, userLogoutTask);
}
export function* userPasswordChangeWatcher() {
    yield takeEvery(AT.USER_PASSWORD_CHANGE_TASK, userPasswordChangeTask);
}
export function* typesAddWatcher() {
    yield takeEvery(AT.TYPES_ADD_TASK, typesAddTask);
}
export function* categoriesAddWatcher() {
    yield takeEvery(AT.CATEGORIES_ADD_TASK, categoriesAddTask);
}
export function* subcategoriesAddWatcher() {
    yield takeEvery(AT.SUBCATEGORIES_ADD_TASK, subcategoriesAddTask);
}

export function* rootSaga() {
    yield all([
        eventAddWatcher(),
        eventEditWatcher(),
        eventRemoveWatcher(),
        eventsAddWatcher(),
        eventsSearchWatcher(),
        usersAddWatcher(),
        userRegisterWatcher(),
        userLoginWatcher(),
        userRemoveWatcher(),
        userLogoutWatcher(),
        userPasswordChangeWatcher(),
        userAddWatcher(),
        typesAddWatcher(),
        categoriesAddWatcher(),
        subcategoriesAddWatcher(),

    ])
}
