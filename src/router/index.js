import {createRouter, createWebHistory} from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'homeView',
            component: () => import('@/views/home/HomeView.vue'),
            children: [
                {
                    path: '',
                    name: 'home',
                    component: () => import('@/views/home/HomePage.vue')
                },
                {
                    path: 'test-notice',
                    name: 'testNotice',
                    component: () => import('@/views/home/noticePage/TestNoticePage.vue')
                },
                {
                    path: 'test-instructions',
                    name: 'testInstructions',
                    component: () => import('@/views/home/noticePage/TestInstructionsPage.vue')
                },
                {
                    path: 'user-info',
                    name: 'userInfo',
                    component: () => import('@/views/home/userPage/UserInfoPage.vue')
                },
                {
                    path: 'sign-up',
                    name: 'signUp',
                    component: () => import('@/views/home/testPage/SignUpPage.vue')
                },
                {
                    path: 'registration-info',
                    name: 'registrationInfo',
                    component: () => import('@/views/home/userPage/RegistrationInfoPage.vue')
                },
                {
                    path: 'ticket-print',
                    name: 'ticketPrint',
                    component: () => import('@/views/home/userPage/TicketPrintPage.vue')
                },
                {
                    path: 'reset-password',
                    name: 'resetPassword',
                    component: () => import('@/views/home/userPage/ResetPasswordPage.vue')
                }
            ]
        },
        {
            path: '/auth',
            name: 'auth',
            component: () => import("@/views/auth/AuthView.vue"),
            children: [
                {
                    path: 'login',
                    name: 'login',
                    component: () => import("@/views/auth/LoginPage.vue")
                },
                {
                    path: 'register',
                    name: 'register',
                    component: () => import("@/views/auth/RegisterPage.vue")
                }
            ]
        },
        {
            path: '/admin',
            name: 'admin',
            component: () => import('@/views/admin/AdminView.vue'),
            children: [
                {
                    path: '',
                    name: 'adminHome',
                    component: () => import('@/views/admin/TestPage.vue')
                },
                {
                    path: 'testRoom',
                    name: 'testRoom',
                    component: () => import('@/views/admin/TestRoomPage.vue')
                },
                {
                    path: 'testNotice',
                    name: 'testNoticeManage',
                    component: () => import('@/views/admin/TestNoticePage.vue'),
                },
                {
                    path: 'register',
                    name: 'registerManage',
                    component: () => import('@/views/admin/RegisterPage.vue')
                },
                {
                    path: 'menu',
                    name: 'menuPage',
                    component: () => import('@/views/admin/MenuPage.vue')
                },
                {
                    path: 'testNotice/add',
                    name: 'addTestNotice',
                    component: () => import('@/views/admin/TestNoticeAddPage.vue')
                }
            ]
        }
    ]
})

export default router