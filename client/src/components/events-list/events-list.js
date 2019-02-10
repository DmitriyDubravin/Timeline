import React, { useEffect } from 'react';
import Event from '../Event';

const EventsList = ({
    range,
    eventsList,
    getEvents,
    openPopupEventEdit,
    openPopupEventRemove
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
                        editCb={openPopupEventEdit}
                        removeCb={openPopupEventRemove}
                        {...event}
                    />
                ))
            }
        </div>
    );
};

export default EventsList;