import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Sketch from '../views/Sketch.vue'
import Home from '../views/Home'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component:Home,
        redirect: '/sketch',
        meta: {
            title: '',
        },
    },
    {
        path: '/sketch',
        name: 'Sketch',
        component: Sketch,
        meta: {
            title: '',
        },
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior: () => ({ left: 0, top: 0 }),
})

export default router
