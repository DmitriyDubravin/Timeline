import React, {Component} from 'react';
import {connect} from 'react-redux';
import DefaultChronometryPage from './DefaultChronometryPage';

class ChronometryPage extends Component {
    render() {
        if (!this.props.name) return <DefaultChronometryPage />;

        return <h2>Chronometry page</h2>
    }
}

export default connect(
    state => ({
        name: state.user.name
    })
)(ChronometryPage)