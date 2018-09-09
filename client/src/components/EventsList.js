import React from 'react';
import Event from './Event';

export default ({
    eventsListData
    }) => (
        <div className="events-list">
            {
                eventsListData.map(eventData => (
                    <div className="event-item" key={eventData._id}>
                        <Event {...eventData} />
                    </div>
                ))
            }
        </div>
    );
