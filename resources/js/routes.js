import Home from './components/Home.vue';
import Login from './components/auth/Login.vue';
import Main from './components/customers/Main.vue';
import New from './components/customers/New.vue';
import View from './components/customers/View.vue';
import List from './components/customers/List.vue';

export const routes = [
    {
        path: '/',
        component: Home,
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/customers',
        component: Main,
        meta: {
            requiresAuth: true
        },
        children: [
            {
                path: '/',
                component: List
            },
            // {
            //     path: '/new',
            //     component: NewCustomer
            // },
            // {
            //     path: ':id',
            //     component: Customer
            // }
        ]
    }
]; 