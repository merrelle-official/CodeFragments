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

export interface Notification {
    id: number,
    title: string,
    text: string,
    date: string,
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

    const notifications = ref<Notification[]>([
        {
            id: 1,
            title: 'New notification',
            text: 'You have new message',
            date: '19:45 18.03.2025',
        },
        {
            id: 2,
            title: 'New notification',
            text: 'You have new message',
            date: '19:45 18.03.2025',
        },
        {
            id: 3,
            title: 'New notification',
            text: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptate. ',
            date: '19:45 18.03.2025',
            },
    ])

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
        notifications,
        login,
        register,
        logout,
     }
})