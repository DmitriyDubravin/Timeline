
import App from './components/app';
import HomePage from './pages/HomePage';
import ChronometryPage from './pages/ChronometryPage';
import RegisterPage from './pages/RegisterPage';
import NoMatchPage from './pages/NoMatchPage';
import UsersPage from './pages/UsersPage';
import UserPage from './pages/UserPage';
import EmailConfirmedPage from './pages/EmailConfirmedPage';
import SearchPage from './pages/SearchPage';


export default [
    {
        component: App,
        routes: [
            {
                path: "/",
                exact: true,
                component: HomePage
            },
            {
                path: "/register",
                exact: true,
                component: RegisterPage
            },
            {
                path: "/chronometry",
                exact: true,
                component: ChronometryPage
            },
            {
                path: "/users",
                exact: true,
                component: UsersPage,
            },
            {
                path: "/users/:user",
                exact: true,
                component: UserPage,
            },
            {
                path: "/search",
                exact: true,
                component: SearchPage
            },
            {
                path: "/email-confirmation/:hash",
                exact: true,
                component: EmailConfirmedPage,
            },
            {
                path: "/404",
                exact: true,
                component: NoMatchPage
            },
            {
                component: NoMatchPage
            }
        ]
    }
]