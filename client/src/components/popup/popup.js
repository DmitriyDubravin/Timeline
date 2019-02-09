import React from 'react';
import { FaTimes } from 'react-icons/fa';

const Popup = ({
    close,
    children
}) => {
    const handleClose = () => close();
    return (
        <div className="popup">
            <button className="tile btn-close" onClick={handleClose}><FaTimes /></button>
            <div className="inner">
                {children}
            </div>
        </div>
    )
};

export default Popup;
