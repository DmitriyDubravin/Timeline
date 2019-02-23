import React, { useEffect } from 'react';
import {renderRoutes} from 'react-router-config';
import Header from 'components/header';
import Popups from 'components/popups';

const App = ({
    route,
    history,
    location,
    user,
    setDate,
    setUser
}) => {
    useEffect(() => {
        setDate();
        setUser();
    }, []);

    return user.isAuthorized !== undefined && (
        <div className="App">
            <div className="main-holder">
                <Header />
                {renderRoutes(route.routes, {history, location})}
                <Popups />
            </div>

        </div>
    );
};

export default App;
