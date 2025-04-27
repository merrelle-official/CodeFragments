<script setup lang="ts">
import Header from '@/components/Header.vue'
import { RouterView, useRoute } from 'vue-router'
import { onMounted } from 'vue'
import { useAuth } from './hooks/useAuth'

const route = useRoute()

const { checkAuth } = useAuth()

onMounted(() => {
  checkAuth()
})
</script>

<template>
  <main>
    <Header v-if="route.path !== '/auth'" />
    <RouterView />
  </main>
  
</template>

<style scoped>

</style>
