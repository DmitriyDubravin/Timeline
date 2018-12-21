import React from 'react';
import {connect} from 'react-redux';

function DateString({dateStr}) {
    return (
        <div className="tile date-string">
            {dateStr}
        </div>
    )
}

export default connect(
    state => ({
        dateStr: state.date.dateStr
    })
)(DateString)
