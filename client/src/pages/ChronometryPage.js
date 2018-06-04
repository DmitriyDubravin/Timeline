import React, {Component} from 'react';
import {connect} from 'react-redux';
import DefaultChronometryPage from './DefaultChronometryPage';
import AddChronometryEventForm from './../components/forms/AddChronometryEventForm';

class ChronometryPage extends Component {
    render() {
        if (!this.props.name) return <DefaultChronometryPage />;

        return (
            <div>
                <h2>Chronometry page</h2>
                <AddChronometryEventForm />
            </div>
        )
    }
}

export default connect(
    state => ({
        name: state.user.name
    })
)(ChronometryPage)