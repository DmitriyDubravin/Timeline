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
            queries: {},
            resultList: []
        }
        this.inputHandler = this.inputHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.editEvent = this.editEvent.bind(this);
        this.deleteEvent = this.deleteEvent.bind(this);
    }
    inputHandler(event) {
        const {name, value} = event.target;
        this.setState({
            queries: {
                ...this.state.queries,
                [name]: value
            }
        });
    }
    submitHandler(event) {
        event.preventDefault();

        if (this.props.queries[this.state.query] === undefined) {

            queryServer({
                path: paths.search,
                data: {
                    user: this.props.name,
                    queries: this.state.queries
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
        console.log(response.data);
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
                        <input type="text" name="type" placeholder="Type" onChange={this.inputHandler} />
                    </div>
                    <div className="line">
                        <input type="text" name="category" placeholder="Category" onChange={this.inputHandler} />
                    </div>
                    <div className="line">
                        <input type="text" name="subcategory" placeholder="Subcategory" onChange={this.inputHandler} />
                    </div>
                    <div className="line">
                        <input type="text" name="comment" placeholder="Comment" onChange={this.inputHandler} />
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