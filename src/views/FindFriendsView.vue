<template>
    <div id="FindFriends" class="pt-[100px] overflow-auto fixed h-[100vh] w-full">
        <div v-for="user in usersComputed" :key="user.sub">
            <div v-if="user.sub !== userStore.sub" @click="createNewChat(user)" class="flex w-full p-4 items-center cursor-pointer">
                <img class="rounded-full mr-4 w-12" :src="user.picture || ''" alt="" />
                <div class="w-full">
                    <div class="flex justify-between items-center">
                    <div class="text-[15px] text-gray-600">{{ user.firstName }} {{ user.lastName }}</div>
                    </div>
                    <div class="flex items-center">
                    <div class="text-[15px] text-gray-500">
                        Hi, I'm using WhatsApp!    
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { computed, ref } from 'vue'
    import { storeToRefs } from 'pinia'
    import { useUserStore } from '@/store/user-store'

    const emit = defineEmits(["onSelectChat"]);
    
    const userStore = useUserStore();
    const { sub, userDataForChat, allUsers, removeUsersFromFindFriends } = storeToRefs(userStore);
    let users = ref([]);

    const createNewChat = (user) => {
        userDataForChat.value = [];
        userDataForChat.value.push({
            id: '',
            sub1: sub.value,
            sub2: user.sub,
            firstName: user.firstName,
            picture: user.picture
        });
        emit("onSelectChat");
    }

    const usersComputed = computed(() => {
        allUsers.value.forEach(user => users.value.push(user));
        removeUsersFromFindFriends.value.forEach(remove => {
            let index = users.value.findIndex(user => user.sub === remove);
            users.value.splice(index, 1);
        });
        return users.value;
    });
</script>
<style lang="scss" scoped></style>