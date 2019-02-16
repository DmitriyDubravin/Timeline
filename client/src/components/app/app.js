import React, { useEffect } from 'react';
import {renderRoutes} from 'react-router-config';
import Header from './../header';
import Popups from './../popups';

import UM from './../../modules/UserModule';
import QM from './../../modules/QueryModule';
import MM from './../../modules/MessageModule';

// TODO needs more protection agains unauthorized users

import { createTodayDateObj } from './../../services/time.service';



const App = ({
    route,
    history,
    location,
    user,
    setDate,
    dispatch
}) => {

    const calcDate = () => {
        setDate(createTodayDateObj());
    }
    const checkUser = async () => {

        const isToken = UM.checkToken();

        if (isToken) {

            const token = UM.getToken();
            const queryData = {
                token: token
            }
            const {success, name} = await QM.verifyToken(queryData);

            if (success) {

                UM.setUser(dispatch, name, token);
                MM.tokenAcknowledgeSuccess().log();

            } else {

                UM.unsetUser(dispatch);
                UM.deleteToken();
                MM.tokenAcknowledgeFailure().log();

            }

        } else {

            UM.unsetUser(dispatch);
            MM.userIsGuest().log();

        }
    }
    useEffect(() => {
        calcDate();
        checkUser();
    }, []);

    // if (!user.isAuthorized) return null;

    return (
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
