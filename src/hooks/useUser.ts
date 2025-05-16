import { useUserStore, type User } from "@/stores/user";
import { ref } from "vue";

export interface FullUserInfo extends User {
    firstname: string | null;
    lastname: string | null;
    bio: string | null;
    gitlink: string | null;
    instlink: string | null;
    tglink: string | null;
    linkedinlink: string | null;
    sitelink: string | null;
} 

export function useUser() {
    const userStore = useUserStore()
    const isLoading = ref<boolean>(false)
    const isError = ref<boolean>(false)
    const textError = ref<string | null>(null)
    const user = ref<FullUserInfo | null>(null)

    const getUserInfoByUsername = async (username: string) => {
        isError.value = false
        textError.value = null

        if (!username) {
            isError.value = true
            textError.value = 'Username is required'
            return
        }

        isLoading.value = true

        try {
            user.value = await userStore.getUserInfoByUsername(username)
        } catch (error) {
            isError.value = true
            textError.value = 'User not found'
        } finally {
            isLoading.value = false
        }
    }

    

    return {
        isLoading,
        isError,
        textError,
        user,
        getUserInfoByUsername,
    }
}