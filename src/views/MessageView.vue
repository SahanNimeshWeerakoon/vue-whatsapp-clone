<template>
    <div class="ml-[420px] w-full">
        <div class="w-full">
            <div id="BG"></div>
            <div class="border-l border-green-500 w-full">
                <div class="bg-[#F0F0F0] fixed z-10 min-w-[calc(100vw-420px)] flex justify-between items-center px-2 py-2">
                    <div class="flex items-center">
                        <img class="rounded-full mx-1 w-10" :src="userStore.picture || ''" alt="" />
                        <div class="text-gray-900 ml-1 font-semibold">Frank</div>
                    </div>
                    <DotsVerticalIcon fillColor="#515151" />
                </div>
            </div>
            <div id="MessagesSection" class="pt-20 pb-8 z-[-1] h-[calc(100vh-65px)] w-[calc(100vw-420px)] overflow-auto fixed touch-auto">
                <div class="px-20 text-sm">
                    <div class="flex w-[calc(100%-50px)]">
                        <div class="inline-block bg-white p-2 rounded-md my-1">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem 
                            Ipsum has been the industry's standard dummy text ever since the 1500s, when an 
                            unknown printer took a galley of type and scrambled it to make a type specimen 
                            book. It has survived not only five centuries, but also the leap into electronic 
                            typesetting, remaining essentially unchanged. It was popularised in the 1960s 
                            with the release of Letraset sheets containing Lorem Ipsum passages, and more 
                            recently with desktop publishing software like Aldus PageMaker including versions 
                            of Lorem Ipsum.
                        </div>
                    </div>
                    <div class="flex justify-end space-x-1 w-[calc(100%-50px)] float-right">
                        <div class="inline-block bg-green-200 p-2 rounded-md my-1">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem 
                            Ipsum has been the industry's standard dummy text ever since the 1500s, when an 
                            unknown printer took a galley of type and scrambled it to make a type specimen 
                            book. It has survived not only five centuries, but also the leap into electronic 
                            typesetting, remaining essentially unchanged. It was popularised in the 1960s 
                            with the release of Letraset sheets containing Lorem Ipsum passages, and more 
                            recently with desktop publishing software like Aldus PageMaker including versions 
                            of Lorem Ipsum.
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-[calc(100vw-420px)] p-2.5 z-10 bg-[#F0F0F0] fixed bottom-0">
                <div class="flex items-center justify-center">
                    <EmoticonExcitedOutlineIcon :sie="27" fillColor="#515151" class="mx-1.5" />
                    <PaperclipIcon :sie="27" fillColor="#515151" class="mx-1.5 mr-3" />
                    <input
                        class="mr-1 shadow appearance-none rounded-lg w-full py-3 px-4 text-gray-700
                        leading-right focus:outline-none focus:shadw-outline"
                        type="text"
                        autocomplete="off"
                        placeholder="Message" />
                    <button class="ml-3 p-2 w-12 flex items-center justify-center">
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
    import { useUserStore } from '@/store/user-store'

    const userStore = useUserStore();
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