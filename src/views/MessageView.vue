<template>
    <div class="ml-[420px] w-full">
        <div class="w-full">
            <div id="BG"></div>
            <div class="border-l border-green-500 w-full">
                <div class="bg-[#F0F0F0] fixed z-10 min-w-[calc(100vw-420px)] flex justify-between items-center px-2 py-2">
                    <div class="flex items-center">
                        <img class="rounded-full mx-1 w-10" :src="userStore.userDataForChat[0].picture || ''" alt="" />
                        <div class="text-gray-900 ml-1 font-semibold">{{ userStore.userDataForChat[0].firstName }}</div>
                    </div>
                    <DotsVerticalIcon fillColor="#515151" />
                </div>
            </div>
            <div id="MessagesSection" class="pt-20 pb-8 z-[-1] h-[calc(100vh-65px)] w-[calc(100vw-420px)] overflow-auto fixed touch-auto">
                <div v-if="currentChat && currentChat.length" class="px-20 text-sm">
                    <div v-for="msg in currentChat[0].messages" :key="msg">
                        <!-- message sent by me to friend -->
                        <div v-if="msg.sub !== sub" class="flex w-[calc(100%-50px)]">
                            <div class="inline-block bg-white p-2 rounded-md my-1">
                                {{ msg.message }}
                            </div>
                        </div>
                        <!-- message sent by friend to me -->
                        <div v-else class="flex justify-end space-x-1 w-[calc(100%-50px)] float-right">
                            <div class="inline-block bg-green-200 p-2 rounded-md my-1">
                                {{ msg.message }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-[calc(100vw-420px)] p-2.5 z-10 bg-[#F0F0F0] fixed bottom-0">
                <div class="flex items-center justify-center">
                    <EmoticonExcitedOutlineIcon :sie="27" fillColor="#515151" class="mx-1.5" />
                    <PaperclipIcon :sie="27" fillColor="#515151" class="mx-1.5 mr-3" />
                    <input
                        v-model="message"
                        class="mr-1 shadow appearance-none rounded-lg w-full py-3 px-4 text-gray-700
                        leading-right focus:outline-none focus:shadw-outline"
                        type="text"
                        autocomplete="off"
                        placeholder="Message" />
                    <button :disabled="disableBtn" class="ml-3 p-2 w-12 flex items-center justify-center" @click="sendMessage">
                        <SendIcon fillColor="#515151" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import DotsVerticalIcon from 'vue-material-design-icons/DotsVertical.vue'
    import EmoticonExcitedOutlineIcon from 'vue-material-design-icons/EmoticonExcitedOutline.vue'
    import PaperclipIcon from 'vue-material-design-icons/Paperclip.vue'
    import SendIcon from 'vue-material-design-icons/Send.vue'
    import { ref, watch } from 'vue';
    import { useUserStore } from '@/store/user-store'
    import { storeToRefs } from 'pinia'

    const userStore = useUserStore();
    const { userDataForChat, currentChat, sub } = storeToRefs(userStore);
    
    let message = ref('');
    let disableBtn = ref(false);

    const sendMessage = async () => {
        if(!message.value) return;
        disableBtn.value = true;
        let userData = userDataForChat.value[0];
        await userStore.sendMessage({
            message: message.value,
            sub2: userData.sub2,
            chatId: userData.id
        });
        let data = {
            id: userData.id,
            key1: 'sub1HasViewed',
            val1: false,
            key2: 'sub2HasViewed',
            val2: false,

        }
        if(userData.sub1 === sub.value) {
            data.val1 = true;
            data.val2 = false;
        } else if(userData.sub2 === sub.value) {
            data.val1 = false;
            data.val2 = true;
        }
        await userStore.hasReadMessage(data);
        disableBtn.value = false;
        message.value = '';

        let objDiv = document.getElementById("MessagesSection");
        objDiv.scrollTop = objDiv.scrollHeight;
    }

    watch(() => currentChat.value, (chat) => {
        if(chat.length) {
            setTimeout(() => {
                let objDiv = document.getElementById("MessagesSection");
                objDiv.scrollTop = objDiv.scrollHeight;
            }, 500);
        }
    }, { deep: true });
</script>
<style lang="scss">
    #BG {
        background: url('message-bg.png') no-repeat center;
        width: 100%;
        height: 100%;
        position: fixed;
        z-index: -1;
    }
</style>