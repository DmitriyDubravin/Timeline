import React from 'react';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import {timestampToTimeObj} from './../support/functions';

export default ({
    _id,
    start,
    finish,
    type,
    category,
    subcategory,
    comment,
    editCb,
    deleteCb
}) => {

    const startData = timestampToTimeObj(start);
    const finishData = timestampToTimeObj(finish);
    const startHour = startData.hour;
    const startMinute = startData.minute;
    const finishHour = finishData.hour;
    const finishMinute = finishData.minute;

    return (
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
}
