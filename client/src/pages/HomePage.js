import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import DefaultHomePage from './DefaultHomePage';
import Donut from './../components/D3Donut';

class HomePage extends Component {
    render() {
        if (!this.props.user.isAuthorized) return <DefaultHomePage />;

        return (
            <Fragment>
                <h2>Home page</h2>
                <Donut />
            </Fragment>
        );
    }
}

export default connect(
    state => ({
        user: state.user
    })
)(HomePage)