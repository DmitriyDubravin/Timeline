import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as action from './../store/actions';

class DatePicker extends Component {

    constructor(props) {
        super(props);
        const [day, month, year] = props.date.split(".");

        this.state = {
            showPopup: false,
            chosenYear: +year,
            chosenMonth: +month,
            chosenDay: +day,
            showingYear: +year,
            showingMonth: +month,
            weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
        }

        this.togglePopup = this.togglePopup.bind(this);
        // this.getDaysInMonth = this.getDaysInMonth.bind(this);
        this.setDay = this.setDay.bind(this);
        this.switchMonth = this.switchMonth.bind(this);

    }

    togglePopup() {
        this.setState({showPopup: !this.state.showPopup})
    }

    getDaysInMonth(year, month) {
        return [31, (year % 4 === 0 ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
    }
    getMonthName(monthIndex) {
        return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][--monthIndex]
    }

    setDay(newDay) {
        const {showingMonth, showingYear} = this.state;
        this.setState({
            chosenDay: newDay,
            chosenMonth: showingMonth,
            chosenYear: showingYear
        });
        let newDate = `${newDay}.${showingMonth}.${showingYear}`;
        this.props.setDate(newDate);
    }

    generateDays(year, month) {
        month -= 1;
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
            let onClick = () => this.setDay(d);
            let cls = "day";
            if (
                this.state.showingYear === this.state.chosenYear &&
                this.state.showingMonth === this.state.chosenMonth &&
                d === this.state.chosenDay
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
        if (newMonth === 0) {
            newMonth = 12;
            newYear -= 1;
        }
        if (newMonth === 13) {
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
            <div className="datepicker-holder">
                <button onClick={this.togglePopup}>Datepicker toggler</button>
                {
                    this.state.showPopup &&
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
                }
            </div>
        )
    }
}

export default connect(
    state => ({
        date: state.date.date
    }),
    dispatch => ({
        setDate: function(date) {
            dispatch(action.setDate(date))
        }
    })
)(DatePicker)
