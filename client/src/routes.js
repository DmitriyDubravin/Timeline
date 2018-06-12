
import App from './App';
import HomePage from './pages/HomePage';
import ChronometryPage from './pages/ChronometryPage';
import ChronometryAddPage from './pages/ChronometryAddPage';
import RegisterPage from './pages/RegisterPage';
import NoMatchPage from './pages/NoMatchPage';
import UsersPage from './pages/UsersPage';
import UserPage from './pages/UserPage';
import EmailConfirmedPage from './pages/EmailConfirmedPage';

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
                path: '/chronometry/add',
                exact: true,
                component: ChronometryAddPage
            },
            {
                path: '/users',
                exact: true,
                component: UsersPage,
            },
            {
                path: '/users/:user',
                exact: true,
                component: UserPage,
            },
            {
                path: '/email-confirmation/:hash',
                exact: true,
                component: EmailConfirmedPage,
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