import React from 'react';
import { FaTimes } from 'react-icons/fa';

const Popup = ({
    close,
    children
}) => (
    <div className="popup">
        <button className="tile btn-close" onClick={close}><FaTimes /></button>
        <div className="inner">
            {children}
        </div>
    </div>
);

export default Popup;
