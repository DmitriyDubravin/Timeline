import React, {Component} from 'react';
import {connect} from 'react-redux';
import DefaultChronometryPage from './DefaultChronometryPage';
import AddChronometryEventForm from './../components/forms/AddChronometryEventForm';
import DatePicker from './../components/DatePicker';

class ChronometryPage extends Component {
    render() {
        if (!this.props.name) return <DefaultChronometryPage />;

        return (
            <div>
                <h2>Chronometry add page</h2>
                <DatePicker />
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