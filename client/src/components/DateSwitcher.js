import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as action from './../store/actions';

class DatePicker extends Component {

    switchDay = modificator => {
        let {day, month, year} = this.props.date;
        let date = new Date(year, month, day + modificator);
        let newDay = date.getDate();
        let newMonth = date.getMonth();
        let newYear = date.getFullYear();
        this.props.setDate({day: newDay, month: newMonth, year: newYear});
    }
    switchToToday = () => {
        const {day, month, year} = this.props.date;
        let date = new Date();
        let newDay = date.getDate();
        let newMonth = date.getMonth();
        let newYear = date.getFullYear();
        if (day !== newDay || month !== newMonth || year !== newYear) {
            this.props.setDate({day: newDay, month: newMonth, year: newYear});
        }
    }

    render() {
        return (
            <div className="dateswitcher-box">
                <button onClick={() => this.switchDay(-1)}>Prev</button>
                <button onClick={() => this.switchToToday()}>Today</button>
                <button onClick={() => this.switchDay(1)}>Next</button>
            </div>
        )
    }
}

export default connect(
    state => ({
        date: state.date
    }),
    dispatch => ({
        setDate: function(date) {
            dispatch(action.setDate(date))
        }
    })
)(DatePicker)
