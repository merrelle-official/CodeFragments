<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const menuVisible = ref(false);

const toggleMenu = () => {
  menuVisible.value = !menuVisible.value;
};

const closeMenu = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (!target.closest('.avatar-menu') && !target.closest('.avatar')) {
    menuVisible.value = false;
  }
};

window.addEventListener('click', closeMenu);
</script>

<template>
  <div class="container">
    <img src="@/assets/icons/Notification.svg" alt="" class="notification btn">
    <img 
      :src="userStore.user?.img" 
      alt="" 
      class="avatar btn" 
      @click="toggleMenu" 
    >
    <div v-if="menuVisible" class="user-menu">
        <ul>
            <li class="btn user-li">
                <img :src="userStore.user?.img" alt="" class="user-avatar">
                <span class="user-name">{{ userStore.user?.name }}</span>
                
            </li>
            <hr>
            <li class="btn"><button >Profile</button></li>
            <li class="btn"><button >Settings</button></li>
            <li class="btn"><button  @click="userStore.logout">Logout</button></li>
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
  border-radius: 8px;
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
</style>
