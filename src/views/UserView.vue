<script lang="ts" setup>
import UserPage from '@/components/UserPage.vue';
import { onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const username = route.params.username as string


</script>

<template>
    <div class="user-view">
        <UserPage :username="username"/>
    </div>
</template>

<style scoped>
    .user-view {
        flex: 1 1 0;
        min-height: 0;
        width: 70%;
        margin: 0 auto;
        display: flex;
        align-items: stretch;
        justify-content: center;
        padding: 4rem 0;
    }

    .preloader {
        width: 50px;
        height: 50px;
    }

    .error {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .error img {
        width: 50px;
        height: 50px;
    }
    .warning {
        font-size: 20px;
        margin-top: 10px;
    }
</style>