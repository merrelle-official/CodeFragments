<script setup lang='ts'>
import { useUserStore } from '@/stores/user';
import UserHeaderMenu from '@/components/UserHeaderMenu.vue';
import SearchLine from '@/components/SearchLine.vue'
import { useRouter } from 'vue-router';


const userStore = useUserStore()
const router = useRouter()


</script>

<template>
    <div class="header-container darker">
        <div>
            <h1 class="logo"><router-link to="/">CodeFragments_></router-link></h1>
        </div>
        <SearchLine />
        <div class="user-block">
            <ul v-if="!userStore.isLogin">
                <li><button class="btn btn-primary" @click="() => {router.push({name: 'auth', query: { source: 'login' } })}">Sign in</button></li>
                <li><button class="btn btn-secondary" @click="() => {router.push({name: 'auth', query: { source: 'register' } })}">Sign up</button></li>
            </ul>
            <div v-else class="user-info">
                <UserHeaderMenu />
            </div>
        </div>

    </div>
</template>

<style scoped>
.header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    height: 5rem;
}

.user-block>ul{
    display: flex;
    align-items: center;
    gap: 1rem;
}

.avatar{
    width: 20px;
    height: 20px;
    border-radius: 50%;
    object-fit: cover;
}

.user-info{
    display: flex;
    align-items: center;
    gap: 0.5rem;
    height: 100%;
}

.btn{
    padding: 0.5rem 1rem;
}
</style>