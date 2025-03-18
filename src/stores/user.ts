import { defineStore } from 'pinia'
import { ref } from 'vue'
import UserIMG from '@/assets/imgs/ava.jpg'

export interface User {
    id: number,
    name: string,
    email: string,
    password: string,
    img: string,
}

export const useUserStore = defineStore('user', () => {
    const isLogin = ref(false)

    const user = ref<User | null>({
        id: 1,
        name: 'merrelle',
        email: 'merrelle@text.ru',
        password: '123456',
        img: UserIMG,
    })

    function login(){
        isLogin.value = true
    }

    function register(){
        isLogin.value = true
    }

    function logout(){
        isLogin.value = false
    }

    return {
        isLogin,
        user,
        login,
        register,
        logout,
     }
})