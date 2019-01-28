
// user
export const setUser = data => ({type: "SET_USER", data: data});



// sagas

export const getEvents = payload => ({type: "GET_EVENTS", payload});
export const deleteEvent = payload => ({type: "DELETE_EVENT", payload});

export const getTypes = payload => ({type: "GET_TYPES", payload});
export const getCategories = payload => ({type: "GET_CATEGORIES", payload});
export const getSubcategories = payload => ({type: "GET_SUBCATEGORIES", payload});
export const setTypes = payload => ({type: "SET_TYPES", payload});
export const setCategories = payload => ({type: "SET_CATEGORIES", payload});
export const setSubcategories = payload => ({type: "SET_SUBCATEGORIES", payload});

export const addEvent = payload => ({type: "ADD_EVENT", payload});
export const eventAdded = payload => ({type: 'EVENT_ADDED', payload});
export const editEvent = payload => ({type: "EDIT_EVENT", payload});
export const eventEdited = payload => ({type: 'EVENT_EDITED', payload});

export const userLogout = payload => ({type: 'USER_LOGOUT', payload});

// end sagas


// export const setUserName = name => ({type: "SET_USER_NAME", data: name});
// export const setUserToken = token => ({type: "SET_USER_TOKEN", data: token});
// export const setUserAuthorization = boolean => ({type: "SET_USER_AUTHORIZATION", data: boolean});

// date
export const setDate = date => ({type: "SET_DATE", data: date});

// popups
export const togglePopupMainNav = payload => ({type: "TOGGLE_POPUP_MAIN_NAV", payload});
export const togglePopupEventAdd = payload => ({ type: "TOGGLE_POPUP_EVENT_ADD", payload });
export const togglePopupEventEdit = payload => ({ type: "TOGGLE_POPUP_EVENT_EDIT", payload });
export const togglePopupUserNav = payload => ({type: "TOGGLE_POPUP_USER_NAV", payload});

export const togglePopupLogin = boolean => ({type: "TOGGLE_POPUP_LOGIN", data: boolean});
export const togglePopupDeleteEvent = (boolean, id = null) => ({type: "TOGGLE_POPUP_DELETE_EVENT", data: {boolean, id}});
export const togglePopupDatePicker = boolean => ({type: "TOGGLE_POPUP_DATE_PICKER", data: boolean});

// usersList

export const addUsersList = usersList => ({type: "ADD_USERS_LIST", data: usersList});


// events
// export const addEvent = (range, event) => ({type: 'ADD_EVENT', data: {range, event}});
// export const editEvent = event => ({type: 'EDIT_EVENT', data: event});
export const removeEvent = (date, eventId) => ({type: "REMOVE_EVENT", data: {date, eventId}});

export const addRangeEvents = (range, events) => ({type: 'ADD_RANGE_EVENTS', data: {range, events}});
export const addEvents = events => ({type: 'ADD_EVENTS', data: events});
