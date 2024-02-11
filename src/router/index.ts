import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { getAppList, getComponents } from '../views/modules/_List'
import HomeView from '../views/HomeView.vue'

export const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        components: {
            default: HomeView, 
        },
        children: [
            {
                path: '/',
                name: 'Modules',
                components: getComponents()
            }]
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router