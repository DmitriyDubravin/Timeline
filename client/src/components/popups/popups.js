import React, { Fragment } from 'react';

import Popup from './../popup';

import MainNav from '../main-nav';
import EventAdd from './../event-add';
import EventEdit from './../event-edit';
import UserNav from './../user-nav';
import UserLogin from './../user-login';
import DatePicker from './../datepicker';

// import PopupDeleteEvent from '../popup-delete-event';

const Popups = ({

    mainNav,
    eventAdd,
    eventEdit,
    userNav,
    login,
    datePicker,

    closePopupMainNav,
    closePopupEventAdd,
    closePopupEventEdit,
    closePopupUserNav,
    closePopupUserLogin,
    closePopupDatePicker,

    // deleteEvent,
}) => (
    // TODO: get rid of Fragment
    <Fragment>
        {mainNav.show && <Popup close={closePopupMainNav}><MainNav closePopup={closePopupMainNav} /></Popup>}
        {eventAdd.show && <Popup close={closePopupEventAdd}><EventAdd /></Popup>}
        {eventEdit.show && <Popup close={closePopupEventEdit}><EventEdit /></Popup>}
        {/* {deleteEvent.show && <PopupDeleteEvent />} */}
        {userNav.show && <Popup close={closePopupUserNav}><UserNav closePopup={closePopupUserNav} /></Popup>}
        {login.show && <Popup close={closePopupUserLogin}><UserLogin /></Popup>}
        {datePicker.show && <Popup close={closePopupDatePicker}><DatePicker /></Popup>}
    </Fragment>
);

export default Popups;