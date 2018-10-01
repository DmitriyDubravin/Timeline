import React from 'react';
import {renderRoutes} from 'react-router-config';
import Header from './components/Header';
import PopupEventAdd from './components/popupEventAdd';



export default ({
        route
    }) => (
        <div className="App">
            <Header />
            <PopupEventAdd />
            {renderRoutes(route.routes)}
        </div>
    );
