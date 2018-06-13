import React, {Component} from 'react';
import {connect} from 'react-redux';
import DefaultChronometryPage from './DefaultChronometryPage';
import EventsList from './../components/EventsList';
import DatePicker from './../components/DatePicker';

class ChronometryPage extends Component {

    setDate(newDate) {
        console.log(newDate);
    }
    render() {
        if (!this.props.name) return <DefaultChronometryPage />;

        return (
            <div>
                <h2>Chronometry page</h2>
                <DatePicker date="01.06.2018" callback={this.setDate}/>
                <EventsList />
            </div>
        )
    }
}

export default connect(
    state => ({
        name: state.user.name
    })
)(ChronometryPage)
