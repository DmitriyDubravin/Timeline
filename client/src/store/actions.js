import AT from './actions-types';

const action = type => payload => ({type, payload});

let a = {};
for (const key in AT) {
    const type = AT[key].split('_').map((name, index) => {
        return index !== 0
            ? name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
            : name.toLowerCase();
    }).join('');
    a[type] = payload => ({type, payload});
};

export {a};


// tasks
export const eventAddTask = action(AT.EVENT_ADD_TASK);
export const eventEditTask = action(AT.EVENT_EDIT_TASK);
export const eventRemoveTask = action(AT.EVENT_REMOVE_TASK);
export const eventsAddTask = action(AT.EVENTS_ADD_TASK);
export const eventsSearchTask = action(AT.EVENTS_SEARCH_TASK);
export const userAddTask = action(AT.USER_ADD_TASK);
export const usersAddTask = action(AT.USERS_ADD_TASK);
// date
export const setDate = action(AT.DATE_ADD);
// event
export const eventAdd = action(AT.EVENT_ADD);
export const eventEdit = action(AT.EVENT_EDIT);
export const eventRemove = action(AT.EVENT_REMOVE);
// events
export const eventsAdd = action(AT.EVENTS_ADD);
// popups
export const togglePopupNavMain = action(AT.TOGGLE_POPUP_NAV_MAIN);
export const togglePopupNavUser = action(AT.TOGGLE_POPUP_NAV_USER);
export const togglePopupEventAdd = action(AT.TOGGLE_POPUP_EVENT_ADD);
export const togglePopupEventEdit = action(AT.TOGGLE_POPUP_EVENT_EDIT);
export const togglePopupEventRemove = action(AT.TOGGLE_POPUP_EVENT_REMOVE);
export const togglePopupUserRegister = action(AT.TOGGLE_POPUP_USER_REGISTER);
export const togglePopupUserLogin = action(AT.TOGGLE_POPUP_USER_LOGIN);
export const togglePopupDatePicker = action(AT.TOGGLE_POPUP_DATE_PICKER);
// user
export const usersAdd = action(AT.USERS_ADD);
// users
export const userAdd = action(AT.USER_ADD);

// --- --- ---

// sagas

export const getTypes = payload => ({type: "GET_TYPES", payload});
export const getCategories = payload => ({type: "GET_CATEGORIES", payload});
export const getSubcategories = payload => ({type: "GET_SUBCATEGORIES", payload});
export const setTypes = payload => ({type: "SET_TYPES", payload});
export const setCategories = payload => ({type: "SET_CATEGORIES", payload});
export const setSubcategories = payload => ({type: "SET_SUBCATEGORIES", payload});


export const userRegister = payload => ({type: 'USER_REGISTER', payload});
export const userLogin = payload => ({type: 'USER_LOGIN', payload});
export const userLogout = payload => ({type: 'USER_LOGOUT', payload});
export const userRemove = payload => ({type: 'USER_REMOVE', payload});
export const userPasswordChange = payload => ({type: 'USER_PASSWORD_CHANGE', payload});


// end sagas

