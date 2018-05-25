import React from 'react';

export default ({cls = "", txt = ""}) => {
    return txt.length > 0
        ? <div className={`global-message ${cls}`}>{txt}</div>
        : null;
}