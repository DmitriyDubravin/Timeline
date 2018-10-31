import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import EventsList from '../components/EventsList';
import * as action from './../store/actions';
import QM from './../modules/QueryModule';
import QS from 'query-string';
import {extendEventWithHoursMinutes, removeEmptyKeys, checkEventModel} from './../support/functions';

class SearchPage extends Component {
    constructor(props) {
        super(props);
        const queryString = props.location.search;
        const queryObjTemplate = {type: '', category: '', subcategory: '', comment: ''};
        const queryObj = {...queryObjTemplate, ...QS.parse(queryString)};
        this.state = {queryObj, queryString};
        this.inputHandler = this.inputHandler.bind(this);
        this.editEvent = this.editEvent.bind(this);
        this.deleteEvent = this.deleteEvent.bind(this);
    }

    componentDidMount() {
        if (this.isSearchString()) {
            this.search();
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.location.search !== this.props.location.search && this.isSearchString()) {
            this.search();
        }
    }

    async search() {
        const {name, addRangeEvents} = this.props;
        const {queryObj, queryString} = this.state;
        const queryData = {
            author: name,
            queries: removeEmptyKeys(queryObj)
        };
        const {success, data} = await QM.search(queryString, queryData);
        if (success) {
            const events = {};
            data.forEach(event => {
                events[event._id] = event;
            });
            addRangeEvents(queryString, events);
        }
    }

    inputHandler(event) {
        const {name, value} = event.target;
        const queryObj = {...this.state.queryObj, [name]: value};
        const string = QS.stringify(removeEmptyKeys(queryObj));
        const queryString = string.length > 1 ? "?" + string : '';
        this.setState({queryObj, queryString});
    }

    isSearchString() {
        return this.props.location.search.length > 0
    }

    editEvent(id) {
        this.props.togglePopupEditEvent(true, id);
    }
    deleteEvent(id) {
        this.props.togglePopupDeleteEvent(true, id);
    }



    render() {

        const {ranges, events} = this.props;
        const {queryString} = this.state;
        const rangeIds = ranges[queryString];
        const eventsList = rangeIds === undefined
            ? []
            : rangeIds.map(id => {
                return extendEventWithHoursMinutes(checkEventModel(events[id]))
            });

        return (
            <div>
                <h2>Search Page</h2>
                <form className="search-form">
                    <div className="line">
                        <input value={this.state.queryObj.type} onChange={this.inputHandler} name="type" type="text" placeholder="Type" />
                    </div>
                    <div className="line">
                        <input value={this.state.queryObj.category} onChange={this.inputHandler} name="category" type="text" placeholder="Category" />
                    </div>
                    <div className="line">
                        <input value={this.state.queryObj.subcategory} onChange={this.inputHandler} name="subcategory" type="text" placeholder="Subcategory" />
                    </div>
                    <div className="line">
                        <input value={this.state.queryObj.comment} onChange={this.inputHandler} name="comment" type="text" placeholder="Comment" />
                    </div>
                    <Link className="button" to={{
                        pathname: "/search",
                        search: this.state.queryString
                    }}>Search</Link>
                </form>
                <EventsList eventsListData={eventsList} editCb={this.editEvent} deleteCb={this.deleteEvent} />
            </div>
        );
    }
}

export default connect(
    state => ({
        name: state.user.name,
        date: state.date,
        events: state.eventsData.events,
        ranges: state.eventsData.ranges
    }),
    dispatch => ({
        addRangeEvents(range, events) {
            dispatch(action.addRangeEvents(range, events));
        },
        togglePopupEditEvent: function(boolean, id) {
            dispatch(action.togglePopupEditEvent(boolean, id))
        },
        togglePopupDeleteEvent: function(boolean, id) {
            dispatch(action.togglePopupDeleteEvent(boolean, id))
        },
    })

)(SearchPage)