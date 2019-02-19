import React from 'react';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';

const Event = ({
    _id,
    startHour,
    startMinute,
    finishHour,
    finishMinute,
    type,
    category,
    subcategory,
    comment,
    isDeleting,
    openPopupEventEdit,
    openPopupEventRemove
}) => {
    const edit = () => openPopupEventEdit(_id);
    const remove = () => openPopupEventRemove(_id);
    return (
        <div className="event">
            <div className="time">
                {!isDeleting && <button className="icon" onClick={edit}><FaPencilAlt /></button>}
                {!isDeleting && <button className="icon" onClick={remove}><FaTrashAlt /></button>}
                {startHour}:{startMinute} - {finishHour}:{finishMinute}
            </div>
            {type && <div className="line">{type}</div>}
            {category && <div className="line">{category}</div>}
            {subcategory && <div className="line">{subcategory}</div>}
            {comment && <div className="line">{comment}</div>}
        </div>
    );
};

export default Event;