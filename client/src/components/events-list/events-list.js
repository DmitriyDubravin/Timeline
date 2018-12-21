import React, { useEffect } from 'react';
import Event from '../Event';

const EventsList = ({
    range,
    eventsList,
    getEvents,
    openPopupEditEvent,
    openPopupDeleteEvent
}) => {

    useEffect(() => {
        if (!eventsList.length) {
            getEvents();
        }
    }, [range]);

    return (
        <div className="events-list">
            {
                eventsList.map(event => (
                    <Event
                        key={event._id}
                        editCb={openPopupEditEvent}
                        deleteCb={openPopupDeleteEvent}
                        {...event}
                    />
                ))
            }
        </div>
    );
};

export default EventsList;