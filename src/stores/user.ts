import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { AuthAPI } from '@/api/auth'

export interface User {
    id: number,
    username: string,
    email: string,
    role: string,
}

export interface Notification {
    id: number,
    title: string,
    text: string,
    date: string,
}

export const useUserStore = defineStore('user', () => {
    const isLogin = ref(false)
    const user = ref<User | null>(null)
    const token = ref<string | null>(null)

    watch(user, (newUser) => {
        console.log('User changed:', newUser)
    })

    const notifications = ref<Notification[]>([
        {
            id: 1,
            title: 'You have new message',
            text: 'FIVE send you a new message',
            date: '19:45 18.03.2025',
        },
        {
            id: 2,
            title: 'Your fragment was deleted',
            text: 'Your fragment was deleted for violating the rules',
            date: '19:45 18.03.2025',
        },
        {
            id: 3,
            title: 'New subsciber',
            text: 'destenix subscribed to you',
            date: '19:45 18.03.2025',
        },
        {
            id: 4,
            title: 'New comment',
            text: 'destenix commented your fragment (Vue template)',
            date: '19:45 18.03.2025',
        },
    ])

    async function login(email: string, password: string) {
        try {
            const { token: authToken, user: userData } = await AuthAPI.login(email, password)

            token.value = authToken
            user.value = userData
            isLogin.value = true

            localStorage.setItem('token', authToken)
        } catch (error) {
            console.error('Ошибка авторизации:', error)
            throw error 
        }
    }

    async function register(username: string, email: string, password: string) {
        try {
            const { token: authToken, user: userData } = await AuthAPI.register(username, email, password)
            token.value = authToken
            user.value = userData
            isLogin.value = true

            localStorage.setItem('token', authToken)
        } catch (error) {
            console.error('Ошибка регистрации:', error)
            throw error 
        }
    }

    async function checkAuth() {
        const storedToken = localStorage.getItem('token')
        if (!storedToken) return

        try {
            const userData = await AuthAPI.getMe()
            user.value = userData
            token.value = storedToken
            isLogin.value = true
        } catch (error) {
            console.error('Ошибка проверки авторизации:', error)
            logout()
        }
    }

    function logout() {
        isLogin.value = false
        user.value = null
        token.value = null
        localStorage.removeItem('token')
    }

    function deleteNotification(notificationID: number) {
        notifications.value = notifications.value.filter(notification => notification.id !== notificationID)
    }

    function clearAllNotifications() {
        notifications.value = []
    }

    return {
        isLogin,
        user,
        notifications,
        login,
        register,
        logout,
        deleteNotification,
        clearAllNotifications,
        checkAuth,
    }
})
