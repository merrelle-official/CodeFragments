<script setup lang="ts">
import Header from '@/components/Header.vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <main>
    <Header v-if="route.path !== '/auth'" />
    <RouterView />
  </main>
  
</template>

<style scoped>

</style>
