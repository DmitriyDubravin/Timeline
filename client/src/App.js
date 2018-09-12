import React from 'react';
import {renderRoutes} from 'react-router-config';
import Header from './components/Header';



export default ({
        route
    }) => (
        <div className="App">
            <Header />
            {renderRoutes(route.routes)}
        </div>
    );
