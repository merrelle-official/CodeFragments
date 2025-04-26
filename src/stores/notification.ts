import { defineStore } from "pinia"
import { ref } from "vue"

export interface Notification {
    id: number,
    title: string,
    text: string,
    date: string,
}

export const useNotificationStore = defineStore('notification', () => {
    const notifications = ref<Notification[]>([
        {
            id: 1,
            title: 'Notification 1',
            text: 'This is the first notification',
            date: '2023-10-01',
        },
        {
            id: 2,
            title: 'Notification 2',
            text: 'This is the second notification',
            date: '2023-10-02',
        },
        {
            id: 3,
            title: 'Notification 3',
            text: 'This is the third notification',
            date: '2023-10-03',
        },
    ])


    return {
        notifications,
    }
})