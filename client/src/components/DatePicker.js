import React, {Component} from 'react';

export default class DatePicker extends Component {

    constructor(props) {
        super(props);
        const [day, month, year] = props.date.split(".");

        this.state = {
            showPopup: true,
            chosenYear: +year,
            chosenMonth: +month,
            chosenDay: +day,
            showingYear: +year,
            showingMonth: +month
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
        this.props.callback(newDate);
    }

    generateDays(year, month) {
        month -= 1;
        const firstDayNum = new Date(year, month).getDay();
        const daysInCurrentMonth = this.getDaysInMonth(year, month);
        return [...Array(42).keys()].map((day,i) => {
            let d = i >= firstDayNum && i <= daysInCurrentMonth + firstDayNum - 1 ? i - firstDayNum + 1 : '';
            if (d === '') {
                return <div className="day off" key={i}><button>{d}</button></div>
            } else {
                if (
                    this.state.showingYear === this.state.chosenYear &&
                    this.state.showingMonth === this.state.chosenMonth &&
                    d === this.state.chosenDay
                ) {
                    return (
                        <div className="day chosen" key={i}><button>{d}</button></div>
                    )
                } else {

                    return (
                        <div className="day" key={i}>
                            <button onClick={() => this.setDay(d)}>{d}</button>
                        </div>
                    )
                }
            }
        });
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

        const {showingYear, showingMonth} = this.state;

        const days = this.generateDays(showingYear, showingMonth);
        const month = this.getMonthName(showingMonth);
        const year = showingYear;

        return (
            <div>
                <button onClick={this.togglePopup}>Datepicker toggler</button>
                {
                    this.state.showPopup &&
                    <div className="datepicker">
                        <button onClick={() => this.switchMonth(-1)}>Prev</button>
                        <div>{month} {year}</div>
                        <button onClick={() => this.switchMonth(1)}>Next</button>
                        <div className="days">
                            {days}
                        </div>
                    </div>
                }
            </div>
        )
    }
}
