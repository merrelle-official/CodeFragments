<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { useToggle } from '@/composables/hooks';

const userStore = useUserStore();

const { state: menuVisible, toggle: toggleMenu } = useToggle();
const { state: notificationVisible, toggle: toggleNotification } = useToggle();

const closeDropdowns = (event: MouseEvent) => {
  const target = event.target as HTMLElement;

  if (!target.closest('.avatar-menu') && !target.closest('.avatar')) {
    menuVisible.value = false;
  }

  if (!target.closest('.notification-menu') && !target.closest('.notification')) {
    notificationVisible.value = false;
  }
};

onMounted(() => {
  window.addEventListener('click', closeDropdowns);
});

onUnmounted(() => {
  window.removeEventListener('click', closeDropdowns);
});

</script>

<template>
  <div class="container">
    <img src="@/assets/icons/Notification.svg" alt="" class="notification btn" @click="toggleNotification">

    <div v-if="notificationVisible" class="notification-menu" :class="{'clear-notifications': userStore.notifications.length === 0}">
      <p v-if="!userStore.notifications.length" class="no-notifications">No any notifications</p>
      <template v-else>
        <button v-if="userStore.notifications.length !== 0" class="clear-notifications btn" @click.stop="userStore.clearAllNotifications">Clear all</button>
        <ul>
            <li v-for="item in userStore.notifications" :key="item.id" class="notification-li">
              <div class="btn">
                <h5 class="notification-title">{{ item.title }}</h5>
                <p class="notification-text">{{ item.text }}</p>
                <p class="notification-date">{{ item.date }}</p>
                <img src="@/assets/icons/Cross.svg" alt="" class="delete-notification btn" @click.stop="userStore.deleteNotification(item.id)">
              </div>
              <hr>
            </li>
        </ul>
      </template>
    </div>

    <img
      src="@/assets/imgs/ava.jpg"
      alt=""
      class="avatar btn"
      @click="toggleMenu"
    >
    <div v-if="menuVisible" class="user-menu">
        <ul>
            <li class="btn user-li">
                <img :src="userStore.user?.img" alt="" class="user-avatar">
                <span class="user-name">{{ userStore.user?.username }}</span>

            </li>
            <hr>
            <li class="btn"><button >Profile</button></li>
            <li class="btn"><button >Settings</button></li>
            <li class="btn" @click="userStore.logout"><button>Logout</button></li>
        </ul>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  position: relative;
}

.notification {
  padding: 0.3rem;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
}

.user-menu {
  position: absolute;
  top: 103%;
  right: 0;
  border-radius: 4px;
  min-width: 10rem;
  padding: 0.5rem;
  border: 0.5px solid #606060;
}

.user-menu ul {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    align-items: flex-start;
}

.user-menu li {
    width: 100%;
    padding: 0.5rem;
    text-align: left;
    border: none;
    border-radius: 0px;
    cursor: pointer;
}

.user-li{
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.user-avatar{
    width: 20px;
    height: 20px;
    border-radius: 50%;
    object-fit: cover;
}

.user-name{
    font-size: 0.8rem;
}

hr{
    width: 100%;
    border: 0.5px solid #424242;
    margin: 0.5rem 0;
}

.notification-menu{
  position: absolute;
  top: 103%;
  right: 0;
  border-radius: 4px;
  min-width: 22rem;
  padding: 0.5rem;
  border: 0.5px solid #606060;
  height: 25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow-y: auto;
}

.notification-li{
    width: 100%;
    /* padding: 0.5rem; */
    text-align: left;
    border: none;
    border-radius: 0px;
    cursor: pointer;
}

.notification-li>div{
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    border: 0.5px solid #606060;
    position: relative;
}

.notification-text{
    font-size: 0.7rem;
}

.notification-date{
    font-size: 0.6rem;
    color: #606060;
}

.clear-notifications{
  align-self: end;
  padding: 0.3rem;
  border: 0.5px solid #606060;
}

.delete-notification{
  width: 10px;
  height: 10px;
  background-color: rgb(144, 1, 1);
  border-radius: 50%;
  padding: 2px;
  box-sizing: content-box;
  display: flex;
  position: absolute;
  top: -5px;
  right: -5px;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
}

.notification-li:hover .delete-notification {
  opacity: 1;
}

.no-notifications{
  color: #5e5e5e;
}

.clear-notifications{
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
