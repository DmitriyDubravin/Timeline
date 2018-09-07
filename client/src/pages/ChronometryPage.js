import React, {Component} from 'react';
import {connect} from 'react-redux';
import DefaultChronometryPage from './DefaultChronometryPage';
import EventsListContainer from './../components/EventsListContainer';
import DateSwitcher from './../components/DateSwitcher';
import DatePicker from './../components/DatePicker';

class ChronometryPage extends Component {
    render() {
        if (!this.props.user.isAuthorized) return <DefaultChronometryPage />;

        return (
            <div>
                <h2>Chronometry page</h2>
                <DateSwitcher />
                <DatePicker />
                <EventsListContainer />
            </div>
        )
    }
}

export default connect(
    state => ({
        user: state.user
    })
)(ChronometryPage)
