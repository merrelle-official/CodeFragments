<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '@/hooks/useAuth.ts'
import { useRoute } from 'vue-router'
import router from '@/router'

const { login, register, isError, textError, isLoading } = useAuth()

const route = useRoute()
const isFormLogin = ref(route.query.source === 'login')

const loginEmail = ref('')
const loginPassword = ref('')

const registerUsername = ref('')
const registerEmail = ref('')
const registerPassword = ref('')
const registerPasswordConfirm = ref('')

const handleLogin = (e: Event) => {
    e.preventDefault()
    login(loginEmail.value, loginPassword.value)
}

const handleRegister = (e: Event) => {
    e.preventDefault()
    register(registerUsername.value, registerEmail.value, registerPassword.value, registerPasswordConfirm.value)
}

const toggleForm = () => {
  isFormLogin.value = !isFormLogin.value
  isError.value = false
  textError.value = ''
}

const goHome = () => {
    router.push({name: "home"})
}

</script>

<template>
    <main class="main">
        <div v-if="isFormLogin" class="auth-container darker">
            <button class="btn btn-secondary go-home" @click="goHome">&lt Go home</button>
            <h1>Sign in</h1>
            <form @submit="handleLogin" class="login-form">
                <div class="input-container">
                    <div class="input-wrapper">
                        <input type="email" id="email" placeholder=" " class="input-field input" v-model="loginEmail" required>
                        <label for="email" class="floating-label">Email</label>
                    </div>
                    <div class="input-wrapper">
                        <input type="password" id="password" placeholder=" " class="input-field input" v-model="loginPassword" required>
                        <label for="password" class="floating-label">Password</label>
                    </div>
                </div>
                <div class="login-options">
                    <p class="forgot-password">Forgot password?</p>
                    <p class="no-account" @click="toggleForm">No account? Sign up</p>
                </div>
                <div v-if="isError" class="error_message">
                    <p>{{ textError }}</p>
                </div>
                <button type="submit" :disabled="isLoading" class="login-btn btn btn-primary">Sign in</button>
            </form>
        </div>

        <div v-else class="auth-container darker">
            <button class="btn btn-secondary go-home" @click="goHome">&lt Go home</button>
            <h1>Sign up</h1>
            <form @submit="handleRegister" class="login-form">
                <div class="input-container">
                    <div class="input-wrapper">
                        <input type="text" id="usernamereg" placeholder=" " class="input-field input" autocomplete="off" v-model="registerUsername" required>
                        <label for="usernamereg" class="floating-label">Username</label>
                    </div>
                    <div class="input-wrapper">
                        <input type="email" id="emailreg" placeholder=" " class="input-field input" v-model="registerEmail" required>
                        <label for="emailreg" class="floating-label">Email</label>
                    </div>
                    <div class="input-wrapper">
                        <input type="password" id="passwordreg" placeholder=" " class="input-field input" v-model="registerPassword" required>
                        <label for="passwordreg" class="floating-label">Password</label>
                    </div>
                    <div class="input-wrapper">
                        <input type="password" id="passwordConfirmreg" placeholder=" " class="input-field input" v-model="registerPasswordConfirm" required>
                        <label for="passwordConfirmreg" class="floating-label">Password confirm</label>
                    </div>
                </div>
                <div class="login-options">
                    <p class="forgot-password" @click="toggleForm">Already registered? Sign in</p>
                </div>
                <div v-if="isError" class="error_message">
                    <p>{{ textError }}</p>
                </div>
                <button type="submit" class="login-btn btn btn-primary">Sign up</button>
            </form>
        </div>
    </main>
</template>

<style scoped>
.main{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.auth-container{
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 30%;
    padding: 3rem;
    gap: 2rem;
}

.go-home{
    padding: 0.5rem 0.5rem;
    position: absolute;
    top: 0;
    transform: translateY(-140%);
    left: 0;
}

.login-form{
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
}

.input-container{
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
}

.login-options{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    width: 100%;
}

.login-options p{
    font-size: 10px;
    color: #8e8e8e;
    transition: all 0.1s ease;
}

.login-options p:hover{
    color: #7a7a7a;
    cursor: pointer;
    text-decoration: underline;
}

.login-btn{
    padding: 0.5rem 2rem;
    font-size: 1.2rem;
    font-weight: 600;
    text-align: center;
}

.error_message{
    border: #800000 1px solid;
    background-color: rgba(56, 0, 0, 0.2);
    padding: 1rem;
    width: 100%;
}

.error_message p{
    background: none;
    color: #ff5858;
}
</style>