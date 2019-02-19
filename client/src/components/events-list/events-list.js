import React from 'react';
import Event from './../../components/event';

const EventsList = ({
    eventsList
}) => (
    <div className="events-list">
        {eventsList.map(event => <Event key={event._id} {...event} />)}
    </div>
);

export default EventsList;