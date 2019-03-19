import { all } from 'redux-saga/effects';


import { userCreateTaskWatcher } from './user-create-task';

import { eventAddWatcher } from './event-add';
import { eventEditWatcher } from './event-edit';
import { eventRemoveWatcher } from './event-remove';
import { eventsAddWatcher } from './events-add';
import { eventsSearchWatcher } from './events-search';
import { userAddWatcher } from './user-add';
import { usersAddWatcher } from './users-add';
import { userLoginWatcher } from './user-login';
import { userRemoveWatcher } from './user-remove';
import { userLogoutWatcher } from './user-logout';
import { userPasswordChangeWatcher } from './user-password-change';
import { typesAddWatcher } from './types-add';
import { categoriesAddWatcher } from './categories-add';
import { subcategoriesAddWatcher } from './subcategories-add';

// TODO: rename all saga's files: add '-task'
export function* rootSaga() {
    yield all([

        userCreateTaskWatcher(),

        eventAddWatcher(),
        eventEditWatcher(),
        eventRemoveWatcher(),
        eventsAddWatcher(),
        eventsSearchWatcher(),
        usersAddWatcher(),
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
