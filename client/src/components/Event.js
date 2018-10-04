import React from 'react';

export default ({
        _id,
        startHour,
        startMinute,
        finishHour,
        finishMinute,
        type,
        category,
        subcategory,
        comment,
        editCb,
        deleteCb
    }) => (
        <div className="event">
            {startHour}:{startMinute} | {finishHour}:{finishMinute} | 
            {type} | 
            {category} | 
            {subcategory} | 
            {comment} | 
            <button onClick={() => editCb(_id)}>edit</button> | 
            <button onClick={() => deleteCb(_id)}>delete</button>
        </div>
    );
