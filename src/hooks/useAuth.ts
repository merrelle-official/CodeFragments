import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

export function useAuth() {
    const userStore = useUserStore()
    const router = useRouter()
    const isLoading = ref<boolean>(false)

    const isError = ref<boolean>(false)
    const textError = ref<string | null>(null)

    const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    const validatePassword = (password: string) => password.length >= 8 && /[a-zA-Z]/.test(password) && /\d/.test(password)

    const login = async (email: string, password: string) => {
        isError.value = false
        textError.value = null

        if (!email || !password) {
            isError.value = true
            textError.value = 'Please fill in all fields'
            return
        }

        if (!validateEmail(email)) {
            isError.value = true
            textError.value = 'Invalid email format'
            return
        }

        if (!validatePassword(password)) {
            isError.value = true
            textError.value = 'Password must be at least 8 characters and contain letters and numbers'
            return
        }

        isLoading.value = true        

        try {
            await userStore.login(email, password)
            router.push({ name: 'home' })
        } catch (error) {
            isError.value = true
            textError.value = 'Invalid email or password'
        } finally{
            isLoading.value = false
        }
    }

    const register = async (username: string, email: string, password: string, passwordConfirm: string) => {
        isError.value = false
        textError.value = null

        if (!username || !email || !password || !passwordConfirm) {
            isError.value = true
            textError.value = 'Please fill in all fields'
            return
        }

        if (!validateEmail(email)) {
            isError.value = true
            textError.value = 'Invalid email format'
            return
        }

        if (password !== passwordConfirm) {
            isError.value = true
            textError.value = 'Passwords do not match'
            return
        }

        if (!validatePassword(password)) {
            isError.value = true
            textError.value = 'Password must be at least 8 characters and contain letters and numbers'
            return
        }

        try {
            await userStore.register(username, email, password)
            router.push({ name: 'home' })
        } catch (error: any) {
            isError.value = true
            textError.value = error?.response?.data?.message || 'Registration failed. Please try again.'
        }
    }

    function logout() {
        userStore.logout()
    }

    function checkAuth() {
        userStore.checkAuth()
    }

    return {
        isError,
        textError,
        isLoading,
        checkAuth,
        logout,
        login,
        register,
    }
}
