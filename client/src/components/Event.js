import React from 'react';
import {Link} from 'react-router-dom';

export default ({
        _id,
        startHour,
        startMinute,
        finishHour,
        finishMinute,
        type,
        category,
        subcategory,
        comment
    }) => (
        <div className="event">
            {startHour}:{startMinute} | {finishHour}:{finishMinute} | 
            {type} | 
            {category} | 
            {subcategory} | 
            {comment} | 
            <Link className="link-edit" to={`/chronometry/event/${_id}`}>edit</Link> | 
            <Link to={`/chronometry/event/${_id}/delete`}>delete</Link>
        </div>
    );
