import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import DefaultChronometryPage from './DefaultChronometryPage';
import EventsListContainer from './../components/EventsListContainer';
import DateSwitcher from './../components/DateSwitcher';
import DatePicker from './../components/DatePicker';

class ChronometryPage extends Component {
    render() {
        if (!this.props.user.isAuthorized) return <DefaultChronometryPage />;

        return (
            <Fragment>
                <h2>Chronometry page</h2>
                <DateSwitcher />
                <DatePicker />
                <EventsListContainer />
            </Fragment>
        )
    }
}

export default connect(
    state => ({
        user: state.user
    })
)(ChronometryPage)
