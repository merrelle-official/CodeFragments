import api from './axios';

export const AuthAPI = {
    async login(email: string, password: string) {
        const response = await api.post('/auth/login', { email: email, password: password });
        return response.data;
    },

    async register(username: string, email: string, password: string) {
        const response = await api.post('/auth/register', { username: username, email: email, password: password });
        return response.data;
    },

    async getMe() {
        const response = await api.get('/auth/me');
        return response.data;
    }
};
