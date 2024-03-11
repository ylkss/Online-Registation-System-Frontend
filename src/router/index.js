import {createRouter, createWebHistory} from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/views/HomeView.vue')
        },
        {
            path: '/auth/',
            name: 'auth',
            component: () => import("@/views/auth/AuthView.vue"),
            children: [
                {
                    path: 'login',
                    name: 'login',
                    component: () => import("@/views/auth/LoginPage.vue")
                }
            ]
        }
    ]
})

export default router