
import App from './App';
import HomePage from './pages/HomePage';
import ChronometryPage from './pages/ChronometryPage';
import RegisterPage from './pages/RegisterPage';
import NoMatchPage from './pages/NoMatchPage';
import UserPage from './pages/UserPage';

export default [
    {
        component: App,
        routes: [
            {
                path: '/',
                exact: true,
                component: HomePage
            },
            {
                path: '/register',
                exact: true,
                component: RegisterPage
            },
            {
                path: '/chronometry',
                exact: true,
                component: ChronometryPage
            },
            {
                path: '/:user',
                exact: true,
                component: UserPage
            },
            {
                path: '/404',
                exact: true,
                component: NoMatchPage
            },
            {
                component: NoMatchPage
            }
        ]
    }
]