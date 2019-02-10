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
    removeCb
}) => (
    <div className="event">
        <div className="time">
            {editCb && <button className="icon" onClick={() => editCb(_id)}><FaPencilAlt /></button>}
            {removeCb && <button className="icon" onClick={() => removeCb(_id)}><FaTrashAlt /></button>}
            {startHour}:{startMinute} - {finishHour}:{finishMinute}
        </div>
        {type && <div className="line">{type}</div>}
        {category && <div className="line">{category}</div>}
        {subcategory && <div className="line">{subcategory}</div>}
        {comment && <div className="line">{comment}</div>}
    </div>
);
