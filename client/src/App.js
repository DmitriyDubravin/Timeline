import React from 'react';
import {connect} from 'react-redux';
import {renderRoutes} from 'react-router-config';
import Header from './components/Header';
import PopupLogin from './components/popups/PopupLogin';
import PopupAddEvent from './components/popups/PopupAddEvent';
import PopupEditEvent from './components/popups/PopupEditEvent';
import PopupDeleteEvent from './components/popups/PopupDeleteEvent';
import PopupMainNav from './components/popups/PopupMainNav';
import PopupUserNav from './components/popups/PopupUserNav';

// TEMP! needs more protection agains unauthorized users


const App = ({
        route,
        history,
        location,
        login,
        mainNav,
        userNav,
        addEvent,
        editEvent,
        deleteEvent,
    }) => (
        <div className="App">
            <div className="main-holder">
                <Header />
                {renderRoutes(route.routes, {history, location})}
            </div>
            {mainNav.show && <PopupMainNav />}
            {userNav.show && <PopupUserNav />}
            {addEvent.show && <PopupAddEvent />}
            {editEvent.show && <PopupEditEvent />}
            {deleteEvent.show && <PopupDeleteEvent />}
            {login.show && <PopupLogin />}
        </div>
    );

export default connect(
    state => ({
        login: state.popups.login,
        mainNav: state.popups.mainNav,
        userNav: state.popups.userNav,
        addEvent: state.popups.addEvent,
        editEvent: state.popups.editEvent,
        deleteEvent: state.popups.deleteEvent,
    })
)(App)