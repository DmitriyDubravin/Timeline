import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as action from './../store/actions';

class DatePicker extends Component {

    constructor(props) {
        super(props);

        this.switchDay = this.switchDay.bind(this);
        this.switchToToday = this.switchToToday.bind(this);

    }

    switchDay(modificator) {
        let {day, month, year} = this.props.date;
        let date = new Date(year, month, day + modificator);
        let newDay = date.getDate();
        let newMonth = date.getMonth();
        let newYear = date.getFullYear();
        this.props.setDate({day: newDay, month: newMonth, year: newYear});
    }
    switchToToday() {
        let date = new Date();
        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();
        this.props.setDate({day, month, year});
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
