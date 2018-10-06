
// user
export const setUser = data => ({type: "SET_USER", data: data});

export const setUserName = name => ({type: "SET_USER_NAME", data: name});
export const setUserToken = token => ({type: "SET_USER_TOKEN", data: token});
export const setUserAuthorization = boolean => ({type: "SET_USER_AUTHORIZATION", data: boolean});

// date
export const setDate = date => ({type: "SET_DATE", data: date});

// popups
export const togglePopupLogin = boolean => ({type: "TOGGLE_POPUP_LOGIN", data: boolean});
export const togglePopupAddEvent = boolean => ({type: "TOGGLE_POPUP_ADD_EVENT", data: boolean});
export const togglePopupEditEvent = (boolean, id = null) => ({type: "TOGGLE_POPUP_EDIT_EVENT", data: {boolean, id}});
export const togglePopupDeleteEvent = (boolean, id = null) => ({type: "TOGGLE_POPUP_DELETE_EVENT", data: {boolean, id}});

// eventsListings
// export const addEventsList = (date, eventsList) => ({type: "ADD_EVENTS_LIST", data: {date, eventsList}});
// export const removeEventsList = date => ({type: "REMOVE_EVENTS_LIST", data: date});
// export const updateEventsList = (date, updatedEvent) => ({type: "UPDATE_EVENTS_LIST", data: {date, updatedEvent}});
// export const addEvent = (date, event) => ({type: "ADD_EVENT", data: {date, event}});

// usersList

export const addUsersList = usersList => ({type: "ADD_USERS_LIST", data: usersList});


// events
export const addEvent = (date, event) => ({type: 'ADD_EVENT', data: {date, event}});
export const editEvent = event => ({type: 'EDIT_EVENT', data: event});
export const removeEvent = (date, eventId) => ({type: "REMOVE_EVENT", data: {date, eventId}});

export const addEvents = events => ({type: 'ADD_EVENTS', data: events});
export const addDateEvents = (date, events) => ({type: 'ADD_DATE_EVENTS', data: {date, events}});
