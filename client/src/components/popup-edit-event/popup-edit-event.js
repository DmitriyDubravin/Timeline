import React from 'react';
import { FaTimes } from 'react-icons/fa';
import FormEventEdit from './../form-event-edit';

const PopupEditEvent = ({closePopup}) => (
    <div className="popup">
        <button className="tile btn-close" onClick={closePopup}><FaTimes /></button>
        <div className="inner">
            <FormEventEdit />
        </div>
    </div>
);

export default PopupEditEvent;