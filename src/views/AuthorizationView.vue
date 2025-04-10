<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
const isFormLogin = ref<boolean | null>(route.query.source === 'login' ? true : false)

const isError = ref<boolean>(false);
const textError = ref<string | null>(null);

const loginEmail = ref<string | null>(null);
const loginPassword = ref<string | null>(null);

const registerUsername = ref<string | null>(null);
const registerEmail = ref<string | null>(null);
const registerPassword = ref<string | null>(null);
const registerPasswordConfirm = ref<string | null>(null);

function validatePassword(password: string): boolean {
    return password.length >= 8 && /[a-zA-Z]/.test(password) && /\d/.test(password)
}

const login = async (e: Event) => {
    e.preventDefault();

    const email = loginEmail.value?.trim()
    const password = loginPassword.value

    isError.value = false;
    textError.value = null;

    if (!email || !password) {
        isError.value = true;
        textError.value = 'Please fill in all fields';
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
        isError.value = true
        textError.value = 'Invalid email format'
        return
    }

    if (!validatePassword(password)) {
        isError.value = true;
        textError.value = 'Password must be at least 8 characters';
        return;
    }

    try {
        await userStore.login(email, password);
        router.push({ name: 'home' });
    } catch (error) {
        isError.value = true;
        textError.value = 'Invalid email or password';
    }
};


const register = async (e: Event) => {
    e.preventDefault()

    isError.value = false
    textError.value = null

    const username = registerUsername.value?.trim()
    const email = registerEmail.value?.trim()
    const password = registerPassword.value
    const passwordConfirm = registerPasswordConfirm.value

    if (!username || !email || !password || !passwordConfirm) {
        isError.value = true
        textError.value = 'Please fill in all fields'
        return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
        isError.value = true
        textError.value = 'Invalid email format'
        return
    }

    if (password !== passwordConfirm) {
        isError.value = true
        textError.value = 'Passwords do not match'
        return
    }

    if (!validatePassword(password)) {
        isError.value = true
        textError.value = 'Password must be at least 8 characters and contain letters and numbers'
        return
    }

    try {
        await userStore.register(username, email, password)
        router.push({ name: 'home' })
    } catch (error: any) {
        isError.value = true

        if (error?.response?.data?.message) {
            textError.value = error.response.data.message
        } else {
            textError.value = 'Registration failed. Please try again.'
        }
    }
}



</script>

<template>
    <main class="main">
        <div v-if="isFormLogin" class="auth-container darker">
            
            <h1>Sign in</h1>
            <form action="" class="login-form">
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
                    <p class="no-account" @click="() => {isFormLogin = !isFormLogin}">No account? Sign up</p>
                </div>
                <div v-if="isError" class="error_message">
                    <p>{{ textError }}</p>
                </div>
                <button type="submit" class="login-btn btn btn-primary" @click="login">Sign in</button>
            </form>
        </div>

        <div v-else class="auth-container darker">
            
            <h1>Sign up</h1>
            <form action="" class="login-form" autocomplete="off">
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
                        <input type="password" id="passwordConfurmreg" placeholder=" " class="input-field input" v-model="registerPasswordConfirm" required>
                        <label for="passwordConfurmreg" class="floating-label">Password confirm</label>
                    </div>
                </div>
                <div class="login-options">
                    <p class="forgot-password" @click="() => {isFormLogin = !isFormLogin}">Already registered? Sign in</p>
                </div>
                <div v-if="isError" class="error_message">
                    <p>{{ textError }}</p>
                </div>
                <button type="submit" class="login-btn btn btn-primary" @click="register">Sign up</button>
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 30%;
    padding: 3rem;
    gap: 2rem;
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