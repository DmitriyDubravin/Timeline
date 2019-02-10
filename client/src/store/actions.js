import AT from './actions-types';

// user
export const setUser = data => ({type: "SET_USER", data: data});


// tasks
export const eventAddTask = payload => ({type: AT.EVENT_ADD_TASK, payload});
export const eventEditTask = payload => ({type: AT.EVENT_EDIT_TASK, payload});
export const eventRemoveTask = payload => ({type: AT.EVENT_REMOVE_TASK, payload});

// event
export const eventAdd = payload => ({type: AT.EVENT_ADD, payload});
export const eventEdit = payload => ({type: AT.EVENT_EDIT, payload});
export const eventRemove = payload => ({type: AT.EVENT_REMOVE, payload});

// popups
export const togglePopupNavMain = payload => ({type: AT.TOGGLE_POPUP_NAV_MAIN, payload});
export const togglePopupNavUser = payload => ({type: AT.TOGGLE_POPUP_NAV_USER, payload});
export const togglePopupEventAdd = payload => ({ type: AT.TOGGLE_POPUP_EVENT_ADD, payload });
export const togglePopupEventEdit = payload => ({ type: AT.TOGGLE_POPUP_EVENT_EDIT, payload });
export const togglePopupEventDelete = payload => ({type: AT.TOGGLE_POPUP_EVENT_DELETE, payload});
export const togglePopupUserRegister = payload => ({type: AT.TOGGLE_POPUP_USER_REGISTER, payload});
export const togglePopupUserLogin = payload => ({type: AT.TOGGLE_POPUP_USER_LOGIN, payload});
export const togglePopupDatePicker = payload => ({type: AT.TOGGLE_POPUP_DATE_PICKER, payload});

// sagas

export const getEvents = payload => ({type: "GET_EVENTS", payload});

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

export const search = payload => ({type: 'SEARCH', payload});

// end sagas


// export const setUserName = name => ({type: "SET_USER_NAME", data: name});
// export const setUserToken = token => ({type: "SET_USER_TOKEN", data: token});
// export const setUserAuthorization = boolean => ({type: "SET_USER_AUTHORIZATION", data: boolean});

// date
export const setDate = date => ({type: "SET_DATE", data: date});


// usersList

export const addUsersList = usersList => ({type: "ADD_USERS_LIST", data: usersList});


// events

export const addRangeEvents = (range, events) => ({type: 'ADD_RANGE_EVENTS', data: {range, events}});

// export const addEvent = (range, event) => ({type: 'ADD_EVENT', data: {range, event}});
// export const editEvent = event => ({type: 'EDIT_EVENT', data: event});

// export const addEvents = events => ({type: 'ADD_EVENTS', data: events});
