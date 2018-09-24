import React, {Component} from 'react';
import {connect} from 'react-redux';

class SearchPage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h2>Search Page</h2>
            </div>
        );
    }
}

export default connect(
    state => ({
        name: state.user.name
    })
)(SearchPage)