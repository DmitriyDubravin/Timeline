
import App from './App';
import Home from './pages/Home';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';

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
                path: '/login',
                exact: true,
                component: Login
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