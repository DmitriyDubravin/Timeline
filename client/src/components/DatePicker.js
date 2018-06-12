import React, {Component} from 'react';
import {connect} from 'react-redux';

class DatePicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showPopup: true,
            chosenYear: "2018",
            chosenMonth: "02",
            chosenDay: "01",
            currentYear: 0,
            currentMonth: 0
        }

        this.togglePopup = this.togglePopup.bind(this);
        this.getDaysInCurrentMonth = this.getDaysInCurrentMonth.bind(this);
        this.getDaysInMonth = this.getDaysInMonth.bind(this);
    }
    togglePopup() {
        this.setState({showPopup: !this.state.showPopup})
    }
    getDaysInMonth(year, month) {
        return [31, (year % 4 === 0 ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
    }
    getDaysInCurrentMonth() {
        let {chosenYear, chosenMonth} = this.state;
        console.log(this.getDaysInMonth(chosenYear, --chosenMonth));
    }
    componentDidMount() {
        this.getDaysInCurrentMonth();
    }
    render() {

        const {currentYear, currentMonth} = this.state;

        const daysInCurrentMonth = this.getDaysInMonth(currentYear, currentMonth);

        const days = [...Array(daysInCurrentMonth).keys()].map((day,i) => {
            return <div className="day" key={++i}>{i}</div>
        });

        return (
            <div>
                <h2>DatePicker</h2>
                <button onClick={this.togglePopup}>date</button>
                {
                    this.state.showPopup &&
                    <div className="datepicker">
                        <div className="days">
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
        name: state.user.name
    })
)(DatePicker)
