import React from 'react';
import { FaTimes, FaTrashAlt } from 'react-icons/fa';
import Event from '../Event';
import {extendEventWithHoursMinutes} from '../../support/functions';

const PopupDeleteEvent = ({event, deleteEvent, closePopup}) => {

    function handleDelete() {
        deleteEvent(event._id);
        closePopup();
    }

    // TODO: remove this function
    const eventToDelete = extendEventWithHoursMinutes(event);
    return (
        <div className="popup">
            <button className="tile btn-close" onClick={closePopup}><FaTimes /></button>
            <div className="inner">
                <Event {...eventToDelete} />
                <button className="danger icon" onClick={handleDelete}><FaTrashAlt /></button>
            </div>
        </div>
    )
}

export default PopupDeleteEvent;