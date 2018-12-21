import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import * as action from './../store/actions';
import { FaPlus, FaCalendarAlt } from 'react-icons/fa';
import DateString from './../components/DateString';
import DateSwitcher from './../components/DateSwitcher';
import DefaultChronometryPage from './DefaultChronometryPage';
import EventsList from './../components/events-list';

class ChronometryPage extends Component {
    render() {
        if (!this.props.user.isAuthorized) return <DefaultChronometryPage />;

        const {togglePopupAddEvent, togglePopupDatePicker} = this.props;
        return (
            <Fragment>
                <DateString />
                <button
                    className="add-popup-opener icon"
                    onClick={() => togglePopupAddEvent(true)}
                >
                    <FaPlus />
                </button>
                <DateSwitcher />
                <button
                    className="tile"
                    onClick={() => togglePopupDatePicker(true)}
                >
                    <FaCalendarAlt />
                </button>
                <h2 className="tile main-title">Chronometry page</h2>
                <EventsList />
            </Fragment>
        )
    }
}

export default connect(
    state => ({
        user: state.user
    }),
    dispatch => ({
        dispatch,
        togglePopupLogin: function(boolean) {
            dispatch(action.togglePopupLogin(boolean))
        },
        togglePopupAddEvent: function(boolean) {
            dispatch(action.togglePopupAddEvent(boolean))
        },
        togglePopupDatePicker: function(boolean) {
            dispatch(action.togglePopupDatePicker(boolean))
        },
    })
)(ChronometryPage)
