import React, {Component} from 'react';
import {connect} from 'react-redux';
import queryServer from './../queryServer';

class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: ''
        }
        this.inputHandler = this.inputHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }
    inputHandler(event) {
        this.setState({query: event.target.value});
    }
    submitHandler() {
        queryServer({
            path: '/search',
            data: {
                name: 'admin',
                query: this.state.query
            },
            callback: this.gotSearchResults.bind(this)
        });
    }
    gotSearchResults(data) {
        console.log(data);
    }
    render() {
        console.log(this.state);

        return (
            <div>
                <h2>Search Page</h2>
                <form className="search-form" onSubmit={this.submitHandler}>
                    <div className="line">
                        <input type="text" name="query" placeholder="Search in comment" onChange={this.inputHandler} />
                    </div>
                    <input type="submit" value="Search" />
                </form>
            </div>
        );
    }
}

export default connect(
    state => ({
        name: state.user.name
    })
)(SearchPage)