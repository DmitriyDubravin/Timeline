import React, {Component} from 'react';
import {connect} from 'react-redux';
import queryServer from './../queryServer';
import EventsList from '../components/EventsList';
import * as action from './../store/actions';
import paths from './../paths';

class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            resultList: []
        }
        this.inputHandler = this.inputHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }
    inputHandler(event) {
        this.setState({query: event.target.value});
    }
    submitHandler(event) {
        event.preventDefault();

        if (this.props.queries[this.state.query] === undefined) {

            queryServer({
                path: paths.search,
                data: {
                    name: this.props.name,
                    query: this.state.query
                },
                callback: this.gotSearchResults.bind(this)
            });

        } else {

            const queryIds = this.props.queries[this.state.query];
            const queryEventsList = queryIds === undefined
                ? []
                : queryIds.map(id => this.props.events[id]);
            this.setState({
                resultList: queryEventsList
            })
        }


    }
    gotSearchResults(response) {
        this.setState({resultList: response.data});

        const events = {};
        response.data.forEach(event => {
            events[event._id] = event;
        });
        this.props.addQueryEvents(this.state.query, events);

    }

    editEvent(id) {
        this.props.togglePopupEditEvent(true, id);
    }
    deleteEvent(id) {
        this.props.togglePopupDeleteEvent(true, id);
    }

    render() {


        return (
            <div>
                <h2>Search Page</h2>
                <form className="search-form" onSubmit={this.submitHandler}>
                    <div className="line">
                        <input type="text" name="query" placeholder="Search in comment" onChange={this.inputHandler} />
                    </div>
                    <input type="submit" value="Search" />
                </form>
                <EventsList eventsListData={this.state.resultList} editCb={this.editEvent} deleteCb={this.deleteEvent} />
            </div>
        );
    }
}

export default connect(
    state => ({
        name: state.user.name,
        events: state.eventsData.events,
        queries: state.eventsData.ranges.queries
    }),
    dispatch => ({
        addQueryEvents(query, events) {
            dispatch(action.addQueryEvents(query, events));
        },
        togglePopupEditEvent: function(boolean, id) {
            dispatch(action.togglePopupEditEvent(boolean, id))
        },
        togglePopupDeleteEvent: function(boolean, id) {
            dispatch(action.togglePopupDeleteEvent(boolean, id))
        },
    })

)(SearchPage)