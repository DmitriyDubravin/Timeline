import React from 'react';

export default ({cls = "", txt = ""}) => {
    if (txt.length > 0) {
        return <div className={`msg ${cls}`}>{txt}</div>
    } else {
        return null;
    }
}