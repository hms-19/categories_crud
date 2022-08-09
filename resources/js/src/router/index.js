import { createRouter, createWebHistory } from 'vue-router';
import Category from '../components/Category.vue'
import Manage from '../components/Manage.vue'
import NotFound from '../components/NotFound.vue'


const routes = [
    {
        path : '/',
        name : 'home',
        component : Category
    },
    {
        path : '/category',
        name : 'category',
        component : Category
    },
    {
        path : '/manage',
        name : 'create',
        component : Manage
    },
    {
        path : '/manage/:id',
        name : 'update',
        component : Manage
    },
    {
        path : '/:pathMatch(.*)*',
        name : 'not_found',
        component : NotFound
    }
];

const router = createRouter({
    history : createWebHistory(),
    routes
});

export default router;