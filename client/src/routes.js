
import App from 'components/app';
import PageHome from 'components/page-home';
import PageChronometry from 'components/page-chronometry';
import PageNoMatch from 'components/page-no-match';
import PageUsers from 'components/page-users';
import PageUser from 'components/page-user';
import PageUserEmail from 'components/page-user-email';
import PageSearch from 'components/page-search';

export default [
    {
        component: App,
        routes: [
            {
                path: "/",
                exact: true,
                component: PageHome
            },
            {
                path: "/chronometry",
                exact: true,
                component: PageChronometry
            },
            {
                path: "/users",
                exact: true,
                component: PageUsers,
            },
            {
                path: "/users/:user",
                exact: true,
                component: PageUser,
            },
            {
                path: "/search",
                exact: true,
                component: PageSearch
            },
            {
                path: "/email-confirmation/:hash",
                exact: true,
                component: PageUserEmail,
            },
            {
                path: "/404",
                exact: true,
                component: PageNoMatch
            },
            {
                component: PageNoMatch
            }
        ]
    }
]