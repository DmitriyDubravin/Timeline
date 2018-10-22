import React from 'react';
import {connect} from 'react-redux';
import {renderRoutes} from 'react-router-config';
import Header from './components/Header';
import PopupAddEvent from './components/popups/PopupAddEvent';
import PopupEditEvent from './components/popups/PopupEditEvent';
import PopupDeleteEvent from './components/popups/PopupDeleteEvent';

// TEMP! needs more protection agains unauthorized users


const App = ({
        route,
        history,
        location,
        addEvent,
        editEvent,
        deleteEvent
    }) => (
        <div className="App">
            <Header />
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
    })
)(App)