import { useNotificationStore, type Notification } from "@/stores/notification"

export function useNotification() {
    const notificationStore = useNotificationStore()


    function addNotification(title: string, text: string, date: string) {
    }

    function removeNotification(id: number) {
        notificationStore.notifications = notificationStore.notifications.filter(notification => notification.id !== id)
    }

    function clearNotifications() {
        notificationStore.notifications = []
    }

    return {
        addNotification,
        removeNotification,
        clearNotifications,
    }
}