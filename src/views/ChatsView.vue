<template>
    <div id="Messages" class="pt-1 z-0 overflow-auto fixed h-[calc(100vh-100px)] w-[420px]">
        <div v-for="chat in chats" :key="chat">
            <div @click="openChat(chat)">
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
        try {
            if(userDataForChat.value && userDataForChat.value.length) {
                await userStore.getChatById(userDataForChat.value[0].id);
            }
        } catch(e) {console.log(e)}
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
            let data = {
                id: chat.id,
                key1: 'sub1HasViewed',
                val1: false,
                key2: 'sub2HasViewed',
                val2: false,

            }
            if(chat.sub1 === sub.value || chat.sub2 === sub.value) {
                data.val1 = true;
                data.val2 = true;
            }
            await userStore.hasReadMessage(data);
        } catch(e) {console.log(e)}
    }
</script>
<style lang="scss" scoped></style>