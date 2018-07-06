import React, {Component} from 'react';
import {connect} from 'react-redux';
import DefaultHomePage from './DefaultHomePage';

class HomePage extends Component {
    render() {
        if (!this.props.user.isAuthorized) return <DefaultHomePage />;

        return <h2>Home page</h2>
    }
}

export default connect(
    state => ({
        user: state.user
    })
)(HomePage)