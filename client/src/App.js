import React from 'react';
import {connect} from 'react-redux';
import {renderRoutes} from 'react-router-config';
import * as action from './store/actions';
import Header from './components/Header';
import PopupEventAdd from './components/popupEventAdd';



const App = ({
        route,
        isEventAddShown,
        toggleEventAddPopup
    }) => (
        <div className="App">
            <Header />
            <button onClick={() => toggleEventAddPopup(true)}>+</button>
            {isEventAddShown && <PopupEventAdd />}
            {renderRoutes(route.routes)}
        </div>
    );

export default connect(
    state => ({
        user: state.user,
        isEventAddShown: state.popups.isEventAddShown
    }),
    dispatch => ({
        toggleEventAddPopup: function(boolean) {
            dispatch(action.toggleEventAddPopup(boolean))
        },
    })
)(App)