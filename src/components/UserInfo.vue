<script setup lang="ts">
import { useFollow } from '@/hooks/UseFollow'
import { useUser } from '@/hooks/useUser'
import { useUserStore } from '@/stores/user'
import { computed, onBeforeMount, onMounted, ref, watch } from 'vue'

const userStore = useUserStore()
const { isLoading, isError, user: userPageInfo, getUserInfoByUsername } = useUser()
const { followersCount, followingCount, getUserFollowById, isFollowingById, followUser, unfollowUser } = useFollow()
const isEditMode = ref<boolean>(false)
const fullname = ref<string | null>("")
const newFirstname = ref<string>("")
const newLastname = ref<string>("")
const newBio = ref<string>("")
const isFollowing = ref<boolean>(false)

const {username} = defineProps({
    username: {
        type: String,
        required: true
    }
})

watch(
    () => username,
    async (newUsername) => {
       await getUserInfo(newUsername)
    }
)

const isUserOwner = ref(computed(() => {
  if (userStore.user && userPageInfo.value) {
    return userStore.user.id === userPageInfo.value.id
  }
}))

onBeforeMount(async () => {
  await getUserInfo(username)
})

const getUserInfo = async (newUsername: string) => {
    await getUserInfoByUsername(newUsername)
    const info = userPageInfo.value
    if (info) {
        const { firstname, lastname, username: uname } = info
        const nameParts = [firstname, lastname].filter(Boolean)
        fullname.value = nameParts.length > 0 ? nameParts.join(' ') : uname
        if (info.id !== undefined) {
            await getUserFollowById(info.id)
        }
        if (userStore.user && userStore.user.id !== info.id) {
            const followingStatus = await isFollowingById(info.id)
            isFollowing.value = followingStatus
        }
    }
  
}


const handleEditProfile = () => {
    isEditMode.value = !isEditMode.value
}

const handleToggleFollow = async () => {
  if (!userPageInfo.value?.id) return

  try {
    if (isFollowing.value) {
      await unfollowUser(userPageInfo.value.id)
    } else {
      await followUser(userPageInfo.value.id)
    }
    isFollowing.value = !isFollowing.value
    await getUserFollowById(userPageInfo.value.id)
  } catch (error) {
    console.error('Ошибка при переключении подписки:', error)
  }
}


</script>

<template>
    <div class="user-info__main">
        <div class="user-info__main__user-info">
            <img src="@/assets/imgs/ava.jpg" alt="user avatar" class="user-avatar border">
            <div class="user-info__main__user-info__info">
                <h2 v-if="!isEditMode" class="user-info__main__user-info__info__user-fullname">{{ userPageInfo?.username }}</h2>
                <div v-else class="user-info__main__user-info__info__input-name">
                    <div class="input-wrapper">
                        <input type="text" id="firstname" placeholder=" " class="input-field input" v-model="newFirstname" required>
                        <label for="firstname" class="floating-label">Firstname</label>
                    </div>
                    <div class="input-wrapper">
                        <input type="text" id="lastname" placeholder=" " class="input-field input" v-model="newLastname" required>
                        <label for="lastname" class="floating-label">Lastname</label>
                    </div>
                </div>
                
                <p class="user-info__main__user-info__info__username">@{{  userPageInfo?.username }}</p>
            </div>
            <p v-if="!isEditMode" class="user-info__main__user-info__user-bio" :title="userPageInfo?.bio ? userPageInfo?.bio : ''">{{ userPageInfo?.bio }}</p>
            <div v-else class="user-info__main__user-info__edit-bio input-wrapper ">
                <textarea type="text" id="lastname" placeholder="" class="input-field input" v-model="newBio" required></textarea>
                <label for="lastname" class="floating-label">Bio</label>
            </div>
           
        </div>
        <div class="user-info__main__follow-container">
            <div v-if="!isEditMode" class="user-info__main__follow-container__followings">
                <p>{{ followersCount }} followers</p>
                <p>{{ followingCount }} following</p>
            </div>
            <template v-if="!isUserOwner">
                <button v-if="!isFollowing" class="user-info__main__follow-container__follow-btn btn btn-primary" @click="handleToggleFollow">Follow</button>
                <button v-else class="user-info__main__follow-container__follow-btn btn btn-secondary" @click="handleToggleFollow">Unfollow</button>
            </template>
            <template v-else>
                <button v-if="!isEditMode" class="user-info__main__follow-container__edit-btn btn darker border" @click="handleEditProfile">Edit profile</button>
                <button v-else class="user-info__main__follow-container__save-btn btn btn-primary" @click="handleEditProfile">Save</button>
            </template>
        </div>

        
    </div>
</template>

<style scoped>
.user-info__main {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 100%;
    height: 100%;
    padding: 2rem;
    justify-content: space-between;
}

.user-avatar {
    width: 60%;
    margin: 0 auto;
    height: auto;
    border-radius: 50%;
    object-fit: cover;
    aspect-ratio: 1 / 1;
}

.user-info__main__user-info{
    width: 100%;
    flex: 1;
    /* padding: 2rem 0; */
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.user-info__main__user-info__info{
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.user-info__main__user-info__user-bio{
    /* flex: 1;    */
    display: -webkit-box;
    -webkit-line-clamp: 3;  
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.user-info__main__follow-container{
    width: 100%;
}

.user-info__main__follow-container{
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.user-info__main__follow-container__followings{
    display: flex;
    width: 100%;
    justify-content: center;
    gap: 1rem;
}

.user-info__main__follow-container__followings>p{
    font-size: 0.8rem;
    transition: all 0.2s ease-in-out;
}

.user-info__main__follow-container__followings>p:hover{
    cursor: pointer;
    color: #7d03c8;
}

.user-info__main__follow-container__follow-btn,
.user-info__main__follow-container__edit-btn,
.user-info__main__follow-container__save-btn{
    width: 100%;
    padding: 1rem;
    font-size: 1rem;
    transition: all 0.2s ease-in-out;
}

.user-info__main__follow-container__save-btn{
    background-color: #117d00;
}

.online{
    color: rgb(45, 159, 0);
}

.offline{
    color: gray;
}

.user-info__main__user-info__info__input-name{
    display: flex;
    gap: 1rem;
    width: 100%;
}

.input{
    padding: 0.9rem;
}

.user-info__main__user-info__edit-bio > .input{
    height: 5.1rem;
}
</style>