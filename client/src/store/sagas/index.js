import { all } from 'redux-saga/effects';

import { userCreateTaskWatcher } from './user-create-task';
import { userAddTaskWatcher } from './user-add-task';
import { userLoginTaskWatcher } from './user-login-task';
import { userLogoutTaskWatcher } from './user-logout-task';
import { userPasswordUpdateTaskWatcher } from './user-password-update-task';
import { userRemoveTaskWatcher } from './user-remove-task';


import { eventAddWatcher } from './event-add';
import { eventEditWatcher } from './event-edit';
import { eventRemoveWatcher } from './event-remove';
import { eventsAddWatcher } from './events-add';
import { eventsSearchWatcher } from './events-search';
import { usersAddWatcher } from './users-add';
import { typesAddWatcher } from './types-add';
import { categoriesAddWatcher } from './categories-add';
import { subcategoriesAddWatcher } from './subcategories-add';

// TODO: rename all saga's files: add '-task'
export function* rootSaga() {
    yield all([

        userCreateTaskWatcher(),
        userAddTaskWatcher(),
        userLoginTaskWatcher(),
        userPasswordUpdateTaskWatcher(),
        userRemoveTaskWatcher(),

        userLogoutTaskWatcher(),

        eventAddWatcher(),
        eventEditWatcher(),
        eventRemoveWatcher(),
        eventsAddWatcher(),
        eventsSearchWatcher(),
        usersAddWatcher(),
        typesAddWatcher(),
        categoriesAddWatcher(),
        subcategoriesAddWatcher()
    ])
}
