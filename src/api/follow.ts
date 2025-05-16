import api from './axios';

export const FollowAPI = {
    async getUserFollowById(userId: number){
        const response = await api.get(`/followcounts/${userId}`);
        return response.data;
    },

    async isFollowingById(userId: number){
        const response = await api.get(`/isfollowing/${userId}`);
        return response.data;
    },

    async followUser(followingId: number){
        const response = await api.post(`/follow/${followingId}`);
        return response.data;
    },

    async unfollowUser(followingId: number){
        const response = await api.delete(`/unfollow/${followingId}`);
        return response.data;
    }
}