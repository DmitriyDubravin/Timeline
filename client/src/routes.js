
import App from './App';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import UserRemove from './pages/UserRemove';
import UserEdit from './pages/UserEdit';

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
                path: '/login',
                exact: true,
                component: Login
            },
            {
                path: '/user-edit',
                exact: true,
                component: UserEdit
            },
            {
                path: '/user-remove',
                exact: true,
                component: UserRemove
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