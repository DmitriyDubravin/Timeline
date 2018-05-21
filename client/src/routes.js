
import App from './App';
import Home from './pages/Home';
import Chronometry from './pages/Chronometry';
import Register from './pages/Register';
import NoMatch from './pages/NoMatch';
import User from './pages/User';

export default [
    {
        component: App,
        routes: [
            {
                path: '/',
                exact: true,
                component: Home
            },
            {
                path: '/register',
                exact: true,
                component: Register
            },
            {
                path: '/chronometry',
                exact: true,
                component: Chronometry
            },
            {
                path: '/:user',
                exact: true,
                component: User
            },
            {
                path: '/404',
                exact: true,
                component: NoMatch
            },
            {
                component: NoMatch
            }
        ]
    }
]