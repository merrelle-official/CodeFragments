<script setup lang="ts">
import { ref } from 'vue';



const searchInputRef = ref<HTMLInputElement | null>(null);

const focusInput = () => {
    searchInputRef.value?.focus();
};
</script>

<template>
    <div class="container border">
        <img src="@/assets/icons/Search.svg" alt="" class="search-icon icon" @click="focusInput">
        <input ref="searchInputRef" type="text" class="search-input" placeholder="Find fragments or user..." />
        <img src="@/assets/icons/Send.svg" alt="" class="icon find">
    </div>
</template>

<style scoped>
.search-input{
    padding: 10px;
    width: 100%;
    border-right: 1px solid #606060;
    border-radius: 0px;
}

.icon{
    width: 20px;
    height: auto;
    margin: 7px;
}

.container{
    display: flex;
    align-items: center;
    width: 35%;
}

.container:focus-within {
    box-shadow: 0 0 10px #8a8a8a;
}

.container:hover{
    border-color: #8a8a8a;
}

.find:hover{
    cursor: pointer;
}

.find:active{
    transform: scale(0.9);
}
</style>