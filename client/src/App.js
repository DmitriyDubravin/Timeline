import React from 'react';
import {connect} from 'react-redux';
import {renderRoutes} from 'react-router-config';
import * as action from './store/actions';
import Header from './components/Header';
import PopupAddEvent from './components/PopupAddEvent';
import PopupEditEvent from './components/PopupEditEvent';
import PopupDeleteEvent from './components/PopupDeleteEvent';



const App = ({
        route,
        history,
        location,
        addEvent,
        editEvent,
        deleteEvent,
        togglePopupAddEvent
    }) => (
        <div className="App">
            <Header />
            <button onClick={() => togglePopupAddEvent(true)}>+</button>
            {addEvent.show && <PopupAddEvent />}
            {editEvent.show && <PopupEditEvent />}
            {deleteEvent.show && <PopupDeleteEvent />}
            {renderRoutes(route.routes, {history, location})}
        </div>
    );

export default connect(
    state => ({
        addEvent: state.popups.addEvent,
        editEvent: state.popups.editEvent,
        deleteEvent: state.popups.deleteEvent
    }),
    dispatch => ({
        togglePopupAddEvent: function(boolean) {
            dispatch(action.togglePopupAddEvent(boolean))
        },
    })
)(App)