import { combineReducers } from 'redux';
import date from './date';
import eventsData from './events';
import usersList from './users';
import user from './user';
import popups from './popups';

const reducers = combineReducers({
    date,
    popups,
    eventsData,
    usersList,
    user
});

export default reducers;