import React, { Fragment } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import Event from '../Event';

const EventDelete = ({event, deleteEvent}) => (
    <Fragment>
        <Event {...event} />
        <button className="icon danger" onClick={deleteEvent}><FaTrashAlt /></button>
    </Fragment>
);

export default EventDelete;
