import React from 'react';
import {connect} from 'react-redux';

function DateString({date}) {
    return (
        <div className="tile date-string">
            {date}
        </div>
    )
}

export default connect(
    state => ({
        date: state.date.date
    })
)(DateString)
