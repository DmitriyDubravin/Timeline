import React from 'react';
import {connect} from 'react-redux';
import {renderRoutes} from 'react-router-config';
import Header from './components/Header';
import PopupAddEvent from './components/popups/PopupAddEvent';
import PopupEditEvent from './components/popups/PopupEditEvent';
import PopupDeleteEvent from './components/popups/PopupDeleteEvent';
import PopupMainNav from './components/popups/PopupMainNav';

// TEMP! needs more protection agains unauthorized users


const App = ({
        route,
        history,
        location,
        addEvent,
        editEvent,
        deleteEvent,
        mainNav
    }) => (
        <div className="App">
            <div className="main-holder">
                <Header />
                {renderRoutes(route.routes, {history, location})}
            </div>
            {addEvent.show && <PopupAddEvent />}
            {editEvent.show && <PopupEditEvent />}
            {deleteEvent.show && <PopupDeleteEvent />}
            {mainNav.show && <PopupMainNav />}
        </div>
    );

export default connect(
    state => ({
        addEvent: state.popups.addEvent,
        editEvent: state.popups.editEvent,
        deleteEvent: state.popups.deleteEvent,
        mainNav: state.popups.mainNav,
    })
)(App)