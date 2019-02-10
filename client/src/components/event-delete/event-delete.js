import React, { Fragment } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import Event from '../Event';

const EventDelete = ({event, deleteEvent}) => {
    const handleDeleteEvent = () => deleteEvent({eventId: event._id});
    return (
        <Fragment>
            <Event {...event} />
            <button className="icon danger" onClick={handleDeleteEvent}><FaTrashAlt /></button>
        </Fragment>
    );
};

export default EventDelete;
