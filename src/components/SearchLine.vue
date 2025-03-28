<script setup lang="ts">

</script>

<template>
    <div class="container border">
        <img src="@/assets/icons/Search.svg" alt="" class="search-icon icon">
        <input type="text" class="search-input" placeholder="Find fragments or user..." />
        <img src="@/assets/icons/Send.svg" alt="" class="icon">
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
</style>