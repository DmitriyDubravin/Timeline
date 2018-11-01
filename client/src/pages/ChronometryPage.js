import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import * as action from './../store/actions';
import { FaPlus } from 'react-icons/fa';
import DateString from './../components/DateString';
import DateSwitcher from './../components/DateSwitcher';
import DatePicker from './../components/DatePicker';
import DefaultChronometryPage from './DefaultChronometryPage';
import EventsListContainer from './../components/EventsListContainer';

class ChronometryPage extends Component {
    render() {
        if (!this.props.user.isAuthorized) return <DefaultChronometryPage />;

        const {togglePopupAddEvent} = this.props;
        return (
            <Fragment>
                <DateString />
                <button onClick={() => togglePopupAddEvent(true)} className="add-popup-opener icon"><FaPlus /></button>
                <DateSwitcher />
                <DatePicker />
                <h2>Chronometry page</h2>
                <EventsListContainer />
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
        }
    })
)(ChronometryPage)
