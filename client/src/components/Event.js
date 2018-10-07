import React from 'react';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';

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
            {editCb && <button className="icon" onClick={() => editCb(_id)}><FaPencilAlt /></button>} |
            {deleteCb && <button className="icon" onClick={() => deleteCb(_id)}><FaTrashAlt /></button>}
        </div>
    );
