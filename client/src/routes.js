
import App from './App';
import Home from './pages/Home';
import List from './pages/List';
import SubList from './pages/SubList';

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
                path: '/home',
                component: Home
            },
            {
                path: '/list',
                component: List,
                routes: [
                    {
                        path: '/list/sublist',
                        component: SubList
                    }
                ]
            }
        ]
    }
]