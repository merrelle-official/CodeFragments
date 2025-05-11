<script setup lang="ts">
import UserInfo from '@/components/UserInfo.vue';

const {username} = defineProps({
    username: {
        type: String,
        required: true
    }
})

</script>

<template>
    <div class="user-view__container">
        <div class="user-view__container__user-info border darker">
            <UserInfo :username="username" />
        </div>
        <div class="user-view__container__user-fragments border darker">

        </div>
    </div>
</template>

<style scoped>

.user-view__container {
    display: flex;
    width: 100%;
    min-height: 100%;
    align-items: start;
    gap: 2rem;
}

.user-view__container__user-info {
    flex-basis: 40%;
    height: 100%;
    overflow-y: auto;

}

.user-view__container__user-fragments {
    padding: 2rem;
    flex-basis: 60%;
    min-height: 100%;
}


</style>