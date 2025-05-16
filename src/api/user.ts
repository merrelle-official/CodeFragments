import api from './axios';

export const UserAPI = {
    async getUserById(userId: string) {
        const response = await api.get(`/user/id/${userId}`);
        return response.data;
    }
    ,
    async getUserInfoByUsername(username: string) {
        const response = await api.get(`/user/username/${username}`);
        return response.data;
    },
    async getUserByEmail(email: string) {
        const response = await api.get(`/user/email/${email}`);
        return response.data;
    },
}