import React from 'react';
import { FaTimes } from 'react-icons/fa';
import DatePicker from '../DatePicker';

const PopupDatepicker = ({closePopup}) => (
    <div className="popup">
        <button className="tile btn-close" onClick={closePopup}><FaTimes /></button>
        <div className="inner">
            <DatePicker />
        </div>
    </div>
);

export default PopupDatepicker;
