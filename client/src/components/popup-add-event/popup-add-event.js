import React from 'react';
import { FaTimes } from 'react-icons/fa';
import AddEvent from './../event-add';

const PopupAddEvent = ({closePopup}) => (
    <div className="popup">
        <button className="tile btn-close" onClick={closePopup}><FaTimes /></button>
        <div className="inner">
            <AddEvent />
        </div>
    </div>
);

export default PopupAddEvent;