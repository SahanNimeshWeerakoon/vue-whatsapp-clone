<template>
    <div id="Messages" class="pt-1 z-0 overflow-auto fixed h-[calc(100vh-100px)] w-[420px]">
        <div v-for="chat in chats" :key="chat">
            <div v-if="sub !== chat.sub1" @click="openChat(chat)">
                <MessageRowComponent :chat="chat" />
            </div>
        </div>
    </div>
</template>
<script setup>
    import { onMounted } from 'vue'
    import { storeToRefs } from 'pinia'
    import MessageRowComponent from '../components/MessageRowComponent.vue'
    import { useUserStore } from '@/store/user-store';

    const userStore = useUserStore();
    const { sub, chats, userDataForChat } = storeToRefs(userStore);

    onMounted(async() => {
        if(userDataForChat.value.length) {
            await userStore.getChatById(userDataForChat.value[0].id);
        }
    });

    const openChat = async (chat) => {
        userDataForChat.value = [];
        userDataForChat.value.push({
            id: chat.id,
            sub1: chat.sub1,
            sub2: chat.sub2,
            firstName: chat.user.firstName,
            picture: chat.user.picture
        });
        try {
            await userStore.getChatById(chat.id);
        } catch(e) {console.log(e)}
    }
</script>
<style lang="scss" scoped></style>