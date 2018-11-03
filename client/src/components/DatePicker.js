import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as action from './../store/actions';

class DatePicker extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showPopup: false,
            showingYear: props.date.year,
            showingMonth: props.date.month,
            weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
        }

        this.setDay = this.setDay.bind(this);
        this.switchMonth = this.switchMonth.bind(this);

    }

    componentDidUpdate(prevProps) {
        if (prevProps.date !== this.props.date) {
            this.setState({
                showingYear: this.props.date.year,
                showingMonth: this.props.date.month
            })
        }
    }

    getDaysInMonth(year, month) {
        return [31, (year % 4 === 0 ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
    }
    getMonthName(monthIndex) {
        return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][monthIndex]
    }

    setDay(newDay) {
        const {showingMonth, showingYear} = this.state;
        let newDate = {day: newDay, month: showingMonth, year: showingYear};
        this.props.setDate(newDate);
    }

    generateDays(year, month) {
        const firstDayNum = new Date(year, month).getDay();
        const daysInPrevMonth = new Date(year, month, 0).getDate();
        const daysInCurrentMonth = this.getDaysInMonth(year, month);

        const daysListPrevMonth = [...Array(firstDayNum).keys()].map(i => {
            let d = daysInPrevMonth - firstDayNum + 1 + i;
            let key = 'prev' + i;
            return <div className="day off" key={key}><button>{d}</button></div>
        });
        const daysListCurrentMonth = [...Array(daysInCurrentMonth).keys()].map(i => {
            let d = i + 1;
            let onClick = () => {
                this.setDay(d);
                this.props.togglePopupDatePicker(false);
            };
            let cls = "day";
            if (
                this.state.showingYear === this.props.date.year &&
                this.state.showingMonth === this.props.date.month &&
                d === this.props.date.day
            ) {
                onClick = null;
                cls = "day chosen"
            }
            return <div className={cls} key={i}><button onClick={onClick}>{d}</button></div>
        });
        const daysListNextMonth = [...Array(42 - (daysInCurrentMonth + firstDayNum)).keys()].map(i => {
            let d = i + 1;
            let key = 'next' + i;
            return <div className="day off" key={key}><button>{d}</button></div>
        });

        return [
            ...daysListPrevMonth,
            ...daysListCurrentMonth,
            ...daysListNextMonth
        ];

    }

    switchMonth(modificator) {
        let newMonth = +this.state.showingMonth + modificator;
        let newYear = +this.state.showingYear;
        if (newMonth === -1) {
            newMonth = 12;
            newYear -= 1;
        }
        if (newMonth === 12) {
            newMonth = 1;
            newYear += 1;
        }
        this.setState({
            showingMonth: newMonth,
            showingYear: newYear
        });
    }

    render() {

        const {showingYear, showingMonth, weekdays} = this.state;

        const days = this.generateDays(showingYear, showingMonth);
        const month = this.getMonthName(showingMonth);
        const year = showingYear;
        const daysNames = weekdays.map((day, i) => {
            let key = 'name' + i;
            return <div className="day weekday" key={key}><button>{day}</button></div>
        });

        return (
            <div className="datepicker">
                <div className="head">
                    <button onClick={() => this.switchMonth(-1)}>Prev</button>
                    <div>{month} {year}</div>
                    <button onClick={() => this.switchMonth(1)}>Next</button>
                </div>
                <div className="days">
                    {daysNames}
                    {days}
                </div>
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
        },
        togglePopupDatePicker: function(boolean) {
            dispatch(action.togglePopupDatePicker(boolean))
        }
    })
)(DatePicker)
