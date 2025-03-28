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

    function login(){
        isLogin.value = true
    }

    function register(){
        isLogin.value = true
    }

    function logout(){
        isLogin.value = false
    }

    function deleteNotification(notificationID: number){
         notifications.value = notifications.value.filter(notification => notification.id !== notificationID)
    }

    function clearAllNotifications(){
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
     }
})