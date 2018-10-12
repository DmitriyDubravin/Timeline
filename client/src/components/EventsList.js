import React from 'react';
import Event from './Event';

export default ({
        eventsListData,
        editCb,
        deleteCb
    }) => (
        <div className="events-list">
            {
                eventsListData.map(eventData => (
                    <Event {...eventData} key={eventData._id} editCb={editCb} deleteCb={deleteCb} />
                ))
            }
        </div>
    );
