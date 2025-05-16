import { useFollowStore } from "@/stores/follow"
import { ref } from "vue"



export function useFollow() {
    const followStore = useFollowStore()

    const followersCount = ref(0)
    const followingCount = ref(0)

    const isLoading = ref<boolean>(false)
    const isError = ref<boolean>(false)
    const textError = ref<string | null>(null)

    async function getUserFollowById(userId: number) {
        isError.value = false
        textError.value = null

        if (!userId) {
            isError.value = true
            textError.value = 'User ID is required'
            return
        }

        isLoading.value = true

        try {
            const response = await followStore.getUserFollowById(userId)
            followersCount.value = response.followersCount
            followingCount.value = response.followingCount
        } catch (error) {
            isError.value = true
            textError.value = 'Failed to fetch follow counts'
        } finally {
            isLoading.value = false
        }
    }

    async function isFollowingById(userId: number) {
        isError.value = false
        textError.value = null

        if (!userId) {
            isError.value = true
            textError.value = 'User ID is required'
            return
        }

        isLoading.value = true

        try {
            const response = await followStore.isFollowingById(userId)
            return response
        } catch (error) {
            isError.value = true
            textError.value = 'Failed to check following status'
        } finally {
            isLoading.value = false
        }
    }

    async function followUser(followingId: number) {
        isError.value = false
        textError.value = null

        if (!followingId) {
            isError.value = true
            textError.value = 'Following ID is required'
            return
        }

        isLoading.value = true

        try {
            const response = await followStore.followUser(followingId)
            return response
        } catch (error) {
            isError.value = true
            textError.value = 'Failed to follow user'
        } finally {
            isLoading.value = false
        }
    }

    async function unfollowUser(followingId: number) {
        isError.value = false
        textError.value = null

        if (!followingId) {
            isError.value = true
            textError.value = 'Following ID is required'
            return
        }

        isLoading.value = true

        try {
            const response = await followStore.unfollowUser(followingId)
            return response
        } catch (error) {
            isError.value = true
            textError.value = 'Failed to unfollow user'
        } finally {
            isLoading.value = false
        }
    }

    return {
        isLoading,
        isError,
        textError,
        followersCount,
        followingCount,
        getUserFollowById,
        isFollowingById,
        followUser,
        unfollowUser,
    }

}