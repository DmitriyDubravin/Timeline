import React from 'react';
import {render} from 'react-dom';

import BrowserRouter from 'react-router-dom/BrowserRouter';
import { renderRoutes } from 'react-router-config';
import { createStore, applyMiddleware } from 'redux';

import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import routes from './routes';
import reducers from './modules';

const store = createStore(
  reducers, window.__INITIAL_STATE__, applyMiddleware(thunk)
);

// import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';


const AppRouter = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                {renderRoutes(routes)}
            </BrowserRouter>
        </Provider>
    )
}




render(<AppRouter />, document.querySelector('#root'));
// registerServiceWorker();