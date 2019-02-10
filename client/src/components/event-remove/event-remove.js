import React, { Fragment } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import Event from '../Event';

const EventRemove = ({event, removeEvent}) => {
    const handleRemoveEvent = () => removeEvent({eventId: event._id});
    return (
        <Fragment>
            <Event {...event} />
            <button className="icon danger" onClick={handleRemoveEvent}><FaTrashAlt /></button>
        </Fragment>
    );
};

export default EventRemove;
