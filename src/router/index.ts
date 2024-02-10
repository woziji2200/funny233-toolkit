import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

export const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
        children: [{
            path: '/line',
            name: 'line',
            meta: { title: '转换工具', icon: 'heart', type: 'line' },
            components: { line: () => import('../views/modules/line.vue') }
        },
        {
            path: '/DecimalConversion',
            name: 'DecimalConversion',
            meta: { title: '进制转换', icon: 'heart', type: 'task' },
            components: { DecimalConversion: () => import('../views/modules/DecimalConversion.vue') }
        },
        
        {
            path: '/DecimalConversion',
            name: 'DecimalConversion',
            meta: { title: '进制转换1', icon: 'heart', type: 'task' },
            components: { DecimalConversion: () => import('../views/modules/DecimalConversion.vue') }
        },{
            path: '/DecimalConversion',
            name: 'DecimalConversion',
            meta: { title: '进制转换', icon: 'heart', type: 'task' },
            components: { DecimalConversion: () => import('../views/modules/DecimalConversion.vue') }
        },
        {
            path: '/DecimalConversion',
            name: 'DecimalConversion',
            meta: { title: '进制转换1', icon: 'heart', type: 'task' },
            components: { DecimalConversion: () => import('../views/modules/DecimalConversion.vue') }
        },
        {
            path: '/DecimalConversion',
            name: 'DecimalConversion',
            meta: { title: '进制转换1', icon: 'heart', type: 'task' },
            components: { DecimalConversion: () => import('../views/modules/DecimalConversion.vue') }
        },{
            path: '/DecimalConversion',
            name: 'DecimalConversion',
            meta: { title: '进制转换', icon: 'heart', type: 'task' },
            components: { DecimalConversion: () => import('../views/modules/DecimalConversion.vue') }
        },
        {
            path: '/DecimalConversion',
            name: 'DecimalConversion',
            meta: { title: '进制转换1', icon: 'heart', type: 'task' },
            components: { DecimalConversion: () => import('../views/modules/DecimalConversion.vue') }
        },
        {
            path: '/DecimalConversion',
            name: 'DecimalConversion',
            meta: { title: '进制转换1', icon: 'heart', type: 'task' },
            components: { DecimalConversion: () => import('../views/modules/DecimalConversion.vue') }
        },{
            path: '/DecimalConversion',
            name: 'DecimalConversion',
            meta: { title: '进制转换', icon: 'heart', type: 'task' },
            components: { DecimalConversion: () => import('../views/modules/DecimalConversion.vue') }
        },
        {
            path: '/DecimalConversion',
            name: 'DecimalConversion',
            meta: { title: '进制转换1', icon: 'heart', type: 'task' },
            components: { DecimalConversion: () => import('../views/modules/DecimalConversion.vue') }
        },
        {
            path: '/DecimalConversion',
            name: 'DecimalConversion',
            meta: { title: '进制转换1', icon: 'heart', type: 'task' },
            components: { DecimalConversion: () => import('../views/modules/DecimalConversion.vue') }
        },{
            path: '/DecimalConversion',
            name: 'DecimalConversion',
            meta: { title: '进制转换', icon: 'heart', type: 'task' },
            components: { DecimalConversion: () => import('../views/modules/DecimalConversion.vue') }
        },
        {
            path: '/DecimalConversion',
            name: 'DecimalConversion',
            meta: { title: '进制转换1', icon: 'heart', type: 'task' },
            components: { DecimalConversion: () => import('../views/modules/DecimalConversion.vue') }
        },
        {
            path: '/DecimalConversion',
            name: 'DecimalConversion',
            meta: { title: '进制转换1', icon: 'heart', type: 'task' },
            components: { DecimalConversion: () => import('../views/modules/DecimalConversion.vue') }
        },{
            path: '/DecimalConversion',
            name: 'DecimalConversion',
            meta: { title: '进制转换', icon: 'heart', type: 'task' },
            components: { DecimalConversion: () => import('../views/modules/DecimalConversion.vue') }
        },
        {
            path: '/DecimalConversion',
            name: 'DecimalConversion',
            meta: { title: '进制转换1', icon: 'heart', type: 'task' },
            components: { DecimalConversion: () => import('../views/modules/DecimalConversion.vue') }
        },
        {
            path: '/DecimalConversion',
            name: 'DecimalConversion',
            meta: { title: '进制转换1', icon: 'heart', type: 'task' },
            components: { DecimalConversion: () => import('../views/modules/DecimalConversion.vue') }
        },{
            path: '/line',
            name: 'line',
            meta: { title: '转换工具', icon: 'heart', type: 'line' },
            components: { line: () => import('../views/modules/line.vue') }
        },
        {
            path: '/line',
            name: 'line',
            meta: { title: '转换工具', icon: 'heart', type: 'line' },
            components: { line: () => import('../views/modules/line.vue') }
        },{
            path: '/line',
            name: 'line',
            meta: { title: '转换工具', icon: 'heart', type: 'line' },
            components: { line: () => import('../views/modules/line.vue') }
        },{
            path: '/line',
            name: 'line',
            meta: { title: '转换工具', icon: 'heart', type: 'line' },
            components: { line: () => import('../views/modules/line.vue') }
        },{
            path: '/line',
            name: 'line',
            meta: { title: '转换工具', icon: 'heart', type: 'line' },
            components: { line: () => import('../views/modules/line.vue') }
        },{
            path: '/line',
            name: 'line',
            meta: { title: '转换工具', icon: 'heart', type: 'line' },
            components: { line: () => import('../views/modules/line.vue') }
        },{
            path: '/line',
            name: 'line',
            meta: { title: '转换工具', icon: 'heart', type: 'line' },
            components: { line: () => import('../views/modules/line.vue') }
        },{
            path: '/line',
            name: 'line',
            meta: { title: '转换工具', icon: 'heart', type: 'line' },
            components: { line: () => import('../views/modules/line.vue') }
        },
        {
            path: '/DecimalConversion',
            name: 'DecimalConversion',
            meta: { title: '进制转换', icon: 'heart', type: 'task' },
            components: { DecimalConversion: () => import('../views/modules/DecimalConversion.vue') }
        },
        {
            path: '/line',
            name: 'line',
            meta: { title: '其他', icon: 'heart', type: 'line' },
            components: { line: () => import('../views/modules/line.vue') }
        },
        {
            path: '/Profile',
            name: 'Profile',
            meta: { title: '自我介绍', icon: 'id-card', type: 'task' },
            components: { Profile: () => import('../views/modules/Profile.vue') }
        },]
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router