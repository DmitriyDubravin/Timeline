import React, {Component} from 'react';
import {connect} from 'react-redux';
import DefaultChronometryPage from './DefaultChronometryPage';
import EventsList from './../components/EventsList';
import DatePicker from './../components/DatePicker';

class ChronometryPage extends Component {
    render() {
        if (!this.props.name) return <DefaultChronometryPage />;

        return (
            <div>
                <h2>Chronometry page</h2>
                <DatePicker />
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
