import React from 'react';
import {connect} from 'react-redux';
import {renderRoutes} from 'react-router-config';
import * as action from './store/actions';
import Header from './components/Header';
import PopupEventAdd from './components/popupEventAdd';
import PopupEventEdit from './components/popupEventEdit';



const App = ({
        route,
        history,
        location,
        addEvent,
        isEventEditShown,
        togglePopupAddEvent
    }) => (
        <div className="App">
            <Header />
            <button onClick={() => togglePopupAddEvent(true)}>+</button>
            {addEvent.show && <PopupEventAdd />}
            {isEventEditShown && <PopupEventEdit />}
            {renderRoutes(route.routes, {history, location})}
        </div>
    );

export default connect(
    state => ({
        user: state.user,
        addEvent: state.popups.addEvent,
        isEventEditShown: state.popups.isEventEditShown
    }),
    dispatch => ({
        togglePopupAddEvent: function(boolean) {
            dispatch(action.togglePopupAddEvent(boolean))
        },
    })
)(App)