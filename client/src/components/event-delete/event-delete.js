import React, { Fragment } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import Event from '../Event';
import {extendEventWithHoursMinutes} from '../../support/functions';

const EventDelete = ({event, redirect, deleteEvent}) => {

    // TODO: remove this function
    const eventToDelete = extendEventWithHoursMinutes(event);
    return (
        <Fragment>
            <Event {...eventToDelete} />
            <button className="danger icon" onClick={redirect}><FaTrashAlt /></button>
        </Fragment>
    )
}

export default EventDelete;