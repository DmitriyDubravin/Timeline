import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import EventsList from '../components/EventsList';
import * as action from './../store/actions';
import QM from './../modules/QueryModule';
import queryString from 'query-string';

class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            queries: {
                type: '',
                category: '',
                subcategory: '',
                comment: '',
            },
            resultList: []
        }
        this.inputHandler = this.inputHandler.bind(this);
        this.editEvent = this.editEvent.bind(this);
        this.deleteEvent = this.deleteEvent.bind(this);
    }

    isSearchable() {
        return this.props.location.search.length > 0
    }
    componentDidMount() {
        if (this.isSearchable()) {
            this.setState({
                queries: {
                    ...this.state.queries,
                    ...queryString.parse(this.props.location.search)
                    }
                });
            this.search();
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.location.search !== this.props.location.search) {
            if (this.isSearchable()) {
                this.search();
            }
        }
    }

    async search() {

        const {name, addEvents, location: {search}} = this.props;
        const queryData = {
            author: name,
            queries: this.state.queries
        }

        const {success, data} = await QM.search(search, queryData);
        if (success) {
            this.setState({resultList: data});
            const events = {};
            data.forEach(event => {
                events[event._id] = event;
            });
            addEvents(events);
        }

    }

    clearQueryString(queries) {
        const query = {};
        for (let key in queries) {
            if (queries.hasOwnProperty(key)) {
                query[key] = queries[key].length > 0 ? queries[key] : undefined;
            }
        }
        return queryString.stringify(query);
    }

    setQueries(queries, callback) {
        this.setState({queries: {...this.state.queries, ...queries}}, callback);
    }
    setQueryString() {
        this.setState({query: this.clearQueryString(this.state.queries)})
    }



    inputHandler(event) {
        const {name, value} = event.target;
        this.setQueries({[name]: value}, this.setQueryString);
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
                <form className="search-form">
                    <div className="line">
                        <input value={this.state.queries.type} onChange={this.inputHandler} name="type" type="text" placeholder="Type" />
                    </div>
                    <div className="line">
                        <input value={this.state.queries.category} onChange={this.inputHandler} name="category" type="text" placeholder="Category" />
                    </div>
                    <div className="line">
                        <input value={this.state.queries.subcategory} onChange={this.inputHandler} name="subcategory" type="text" placeholder="Subcategory" />
                    </div>
                    <div className="line">
                        <input value={this.state.queries.comment} onChange={this.inputHandler} name="comment" type="text" placeholder="Comment" />
                    </div>
                    <Link className="button" to={{
                        pathname: "/search",
                        search: this.state.query
                    }}>Search</Link>
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
        addEvents(events) {
            dispatch(action.addEvents(events));
        },
        togglePopupEditEvent: function(boolean, id) {
            dispatch(action.togglePopupEditEvent(boolean, id))
        },
        togglePopupDeleteEvent: function(boolean, id) {
            dispatch(action.togglePopupDeleteEvent(boolean, id))
        },
    })

)(SearchPage)