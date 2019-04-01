import { all } from 'redux-saga/effects';

import { userCreateTaskWatcher } from './user-create-task';
import { userAddTaskWatcher } from './user-add-task';
import { userLoginTaskWatcher } from './user-login-task';
import { userLogoutTaskWatcher } from './user-logout-task';
import { userPasswordUpdateTaskWatcher } from './user-password-update-task';
import { userRemoveTaskWatcher } from './user-remove-task';

import { eventsAddTaskWatcher } from './events-add-task';
import { eventsSearchTaskWatcher } from './events-search-task';

import { usersAddWatcher } from './users-add';

import { eventCreateTaskWatcher } from './event-create-task';
import { eventUpdateTaskWatcher } from './event-update-task';
import { eventRemoveTaskWatcher } from './event-remove-task';

import { typesAddWatcher } from './types-add';
import { categoriesAddWatcher } from './categories-add';
import { subcategoriesAddWatcher } from './subcategories-add';

// TODO: rename all saga's files: add '-task'
export function* rootSaga() {
    yield all([

        userCreateTaskWatcher(),
        userAddTaskWatcher(),
        userLoginTaskWatcher(),
        userLogoutTaskWatcher(),
        userPasswordUpdateTaskWatcher(),
        userRemoveTaskWatcher(),

        eventsAddTaskWatcher(),
        eventsSearchTaskWatcher(),
        usersAddWatcher(),

        eventCreateTaskWatcher(),
        eventUpdateTaskWatcher(),
        eventRemoveTaskWatcher(),

        typesAddWatcher(),
        categoriesAddWatcher(),
        subcategoriesAddWatcher()
    ])
}
