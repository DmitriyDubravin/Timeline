import React from 'react';
import {connect} from 'react-redux';
import {convertNumToTwoDigits} from './../support/functions';

function Date({date}) {
    let day = convertNumToTwoDigits(date.day);
    let month = convertNumToTwoDigits(date.month + 1);
    let year = date.year;

    return (
        <div className="date-box">
            {day}.{month}.{year}
        </div>
    )
}



export default connect(
    state => ({
        date: state.date
    })
)(Date)
