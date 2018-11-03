
// user
export const setUser = data => ({type: "SET_USER", data: data});

// export const setUserName = name => ({type: "SET_USER_NAME", data: name});
// export const setUserToken = token => ({type: "SET_USER_TOKEN", data: token});
// export const setUserAuthorization = boolean => ({type: "SET_USER_AUTHORIZATION", data: boolean});

// date
export const setDate = date => ({type: "SET_DATE", data: date});

// popups
export const togglePopupLogin = boolean => ({type: "TOGGLE_POPUP_LOGIN", data: boolean});
export const togglePopupAddEvent = boolean => ({type: "TOGGLE_POPUP_ADD_EVENT", data: boolean});
export const togglePopupEditEvent = (boolean, id = null) => ({type: "TOGGLE_POPUP_EDIT_EVENT", data: {boolean, id}});
export const togglePopupDeleteEvent = (boolean, id = null) => ({type: "TOGGLE_POPUP_DELETE_EVENT", data: {boolean, id}});
export const togglePopupMainNav = boolean => ({type: "TOGGLE_POPUP_MAIN_NAV", data: boolean});
export const togglePopupUserNav = boolean => ({type: "TOGGLE_POPUP_USER_NAV", data: boolean});
export const togglePopupDatePicker = boolean => ({type: "TOGGLE_POPUP_DATE_PICKER", data: boolean});

// usersList

export const addUsersList = usersList => ({type: "ADD_USERS_LIST", data: usersList});


// events
export const addEvent = (range, event) => ({type: 'ADD_EVENT', data: {range, event}});
export const editEvent = event => ({type: 'EDIT_EVENT', data: event});
export const removeEvent = (date, eventId) => ({type: "REMOVE_EVENT", data: {date, eventId}});

export const addRangeEvents = (range, events) => ({type: 'ADD_RANGE_EVENTS', data: {range, events}});
export const addEvents = events => ({type: 'ADD_EVENTS', data: events});
