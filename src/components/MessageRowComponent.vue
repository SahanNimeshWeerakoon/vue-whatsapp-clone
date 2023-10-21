<template>
  <div class="">
    <div class="flex w-full px-4 py-3 items-center cursor-pointer">
      <img class="rounded-full mr-4 w-12" :src="chat.user && chat.user.picture || ''" alt="" />
      <div class="w-full">
        <div class="flex justify-between items-center">
          <div class="text-[15px] text-gray-600">{{ chat.user && chat.user.firstName }}</div>
          <div class="text-[12px] text-gray-600">{{ lastCreatedAt(chat.messages) }}</div>
        </div>
        <div class="flex items-center">
          <CheckAllIcon :size="18" class="mr-1" />
          <div class="text-[15px] w-full text-gray-500 flex items-center justify-between">
            {{ lastChatMessage(chat.messages) }}
          </div>
        </div>
      </div>
    </div>
    <div class="border-b w-[calc(100%-80px)] float-right"></div>
  </div>
</template>
<script setup>
  import CheckAllIcon from 'vue-material-design-icons/CheckAll.vue'
  import moment from 'moment'
  import { toRefs } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useUserStore } from '@/store/user-store'

  const userStore = useUserStore();
  const props = defineProps({ chat: Object });
  const { sub } = storeToRefs(userStore);
  const { chat } = toRefs(props);

  const lastCreatedAt = (messages) => {
    if(messages.length) {
      return moment(messages[messages.length-1].createdAt).format('MMM D YY | HH:MM A');
    } else return ""
  }
  const lastChatMessage = (messages) => {
    if(messages.length) {
      return messages[messages.length-1].message.substring(0,20);
    } else {
      return "";
    }
  }
  const tickColor = chat => {
    let color = '';
    if(chat.sub1 === sub.value) {
      color = chat.sub1HasViewed ? '#7DF9FF' : '#B5B5B5';
    }
    if(chat.sub2 === sub.value) {
      color = chat.sub2HasViewed ? '#7DF9FF' : '#B5B5B5';
    }
  }

</script>
<style lang="scss"></style>