import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { AuthAPI } from '@/api/auth'

export interface User {
    id: number,
    username: string,
    email: string,
    role: string,
}

export const useUserStore = defineStore('user', () => {
    const isLogin = ref(false)
    const user = ref<User | null>(null)
    const token = ref<string | null>(null)

    async function login(email: string, password: string) {
        const { token: authToken, user: userData } = await AuthAPI.login(email, password)
        token.value = authToken
        user.value = userData
        isLogin.value = true
        localStorage.setItem('token', authToken)
    }

    async function register(username: string, email: string, password: string) {
        const { token: authToken, user: userData } = await AuthAPI.register(username, email, password)
        token.value = authToken
        user.value = userData
        isLogin.value = true
        localStorage.setItem('token', authToken)
    }

    function logout() {
        isLogin.value = false
        user.value = null
        token.value = null
        localStorage.removeItem('token')
    }

    async function checkAuth() {
        const storedToken = localStorage.getItem('token')
        if (!storedToken) return
        try {
            const userData = await AuthAPI.getMe()
            user.value = userData
            token.value = storedToken
            isLogin.value = true
        } catch {
            logout()
        }
    }

    return {
        isLogin,
        user,
        login,
        register,
        logout,
        checkAuth,
    }
})