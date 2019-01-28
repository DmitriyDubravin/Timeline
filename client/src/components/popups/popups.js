import React, { Fragment } from 'react';

import Popup from './../popup';
import MainNav from '../main-nav';
import EventAdd from './../event-add';
import EventEdit from './../event-edit';

import PopupLogin from '../popup-user-login';
import PopupDeleteEvent from '../popup-delete-event';
import PopupUserNav from '../popup-user-nav';
import PopupDatePicker from '../popup-datepicker';

const Popups = ({

    mainNav,
    togglePopupMainNav,

    login,
    userNav,
    eventAdd,
    togglePopupEventAdd,
    eventEdit,
    togglePopupEventEdit,
    deleteEvent,
    datePicker,
}) => (
    // TODO: get rid of Fragment
    <Fragment>
        {mainNav.show && <Popup close={togglePopupMainNav}><MainNav /></Popup>}
        {eventAdd.show && <Popup close={togglePopupEventAdd}><EventAdd /></Popup>}
        {eventEdit.show && <Popup close={togglePopupEventEdit}><EventEdit /></Popup>}
        {userNav.show && <PopupUserNav />}
        {/* {deleteEvent.show && <PopupDeleteEvent />} */}
        {/* {login.show && <PopupLogin />} */}
        {/* {datePicker.show && <PopupDatePicker />} */}
    </Fragment>
);

export default Popups;