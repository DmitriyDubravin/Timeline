import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import DefaultChronometryPage from './DefaultChronometryPage';
import EventsListContainer from './../components/EventsListContainer';

class ChronometryPage extends Component {
    render() {
        if (!this.props.user.isAuthorized) return <DefaultChronometryPage />;

        return (
            <Fragment>
                <h2>Chronometry page</h2>
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
