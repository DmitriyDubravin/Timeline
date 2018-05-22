import React, {Component} from 'react';
import {connect} from 'react-redux';
import DefaultHomePage from './DefaultHomePage';

class HomePage extends Component {
    render() {
        if (this.props.name === undefined) return null;
        if (this.props.name === 'guest') return <DefaultHomePage />;

        return <h2>Home page</h2>
    }
}

export default connect(
    state => ({
        name: state.user.name
    })
)(HomePage)