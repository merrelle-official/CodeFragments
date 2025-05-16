import { FollowAPI } from "@/api/follow";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useFollowStore = defineStore('follow', () => {

    async function getUserFollowById(userId: number) {
        const response = await FollowAPI.getUserFollowById(userId)
        return response
    }

    async function isFollowingById(userId: number) {
        const response = await FollowAPI.isFollowingById(userId)
        return response
    }

    async function followUser(followingId: number) {
        const response = await FollowAPI.followUser(followingId)
        return response
    }

    async function unfollowUser(followingId: number) {
        const response = await FollowAPI.unfollowUser(followingId)
        return response
    }

    return {
        getUserFollowById,
        isFollowingById,
        followUser,
        unfollowUser
    }

})