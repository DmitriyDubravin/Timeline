import React from 'react';
import Event from './Event';

export default ({
    eventsList
    }) => (
        <div className="events-list">
            {
                eventsList.map(eventData => (
                    <div className="event-item" key={eventData._id}>
                        <Event {...eventData} />
                    </div>
                ))
            }
        </div>
    );
