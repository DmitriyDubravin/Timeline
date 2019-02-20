import AT from './actions-types';

// tasks
export const eventAddTask = payload => ({type: AT.EVENT_ADD_TASK, payload});
export const eventEditTask = payload => ({type: AT.EVENT_EDIT_TASK, payload});
export const eventRemoveTask = payload => ({type: AT.EVENT_REMOVE_TASK, payload});
export const eventsAddTask = payload => ({type: AT.EVENTS_ADD_TASK, payload});
export const eventsSearchTask = payload => ({type: AT.EVENTS_SEARCH_TASK, payload});

export const usersAddTask = payload => ({type: AT.USERS_ADD_TASK, payload});

// event
export const eventAdd = payload => ({type: AT.EVENT_ADD, payload});
export const eventEdit = payload => ({type: AT.EVENT_EDIT, payload});
export const eventRemove = payload => ({type: AT.EVENT_REMOVE, payload});
export const eventsAdd = payload => ({type: AT.EVENTS_ADD, payload});

// popups
export const togglePopupNavMain = payload => ({type: AT.TOGGLE_POPUP_NAV_MAIN, payload});
export const togglePopupNavUser = payload => ({type: AT.TOGGLE_POPUP_NAV_USER, payload});
export const togglePopupEventAdd = payload => ({ type: AT.TOGGLE_POPUP_EVENT_ADD, payload });
export const togglePopupEventEdit = payload => ({ type: AT.TOGGLE_POPUP_EVENT_EDIT, payload });
export const togglePopupEventRemove = payload => ({type: AT.TOGGLE_POPUP_EVENT_REMOVE, payload});
export const togglePopupUserRegister = payload => ({type: AT.TOGGLE_POPUP_USER_REGISTER, payload});
export const togglePopupUserLogin = payload => ({type: AT.TOGGLE_POPUP_USER_LOGIN, payload});
export const togglePopupDatePicker = payload => ({type: AT.TOGGLE_POPUP_DATE_PICKER, payload});

// users
export const usersAdd = payload => ({type: AT.USERS_ADD, payload});

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

// user
export const setUser = data => ({type: "SET_USER", data: data});



// export const setUserName = name => ({type: "SET_USER_NAME", data: name});
// export const setUserToken = token => ({type: "SET_USER_TOKEN", data: token});
// export const setUserAuthorization = boolean => ({type: "SET_USER_AUTHORIZATION", data: boolean});

// date
export const setDate = date => ({type: "SET_DATE", data: date});
