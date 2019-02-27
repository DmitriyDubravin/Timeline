import { all } from 'redux-saga/effects';

import { eventAddWatcher } from './event-add';
import { eventEditWatcher } from './event-edit';
import { eventRemoveWatcher } from './event-remove';
import { eventsAddWatcher } from './events-add';
import { eventsSearchWatcher } from './events-search';
import { userAddWatcher } from './user-add';
import { usersAddWatcher } from './users-add';
import { userRegisterWatcher } from './user-register';
import { userLoginWatcher } from './user-login';
import { userRemoveWatcher } from './user-remove';
import { userLogoutWatcher } from './user-logout';
import { userPasswordChangeWatcher } from './user-password-change';
import { typesAddWatcher } from './types-add';
import { categoriesAddWatcher } from './categories-add';
import { subcategoriesAddWatcher } from './subcategories-add';

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
        subcategoriesAddWatcher()
    ])
}
