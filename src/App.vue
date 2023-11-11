<template>
  <router-view />
</template>
<script setup>
  import { onMounted } from 'vue'
  import { useUserStore } from '@/store/user-store'
  import { useRouter } from 'vue-router'

  const userStore = useUserStore();
  const router = useRouter();

  onMounted(() => {
    try {
      if(!userStore.sub) router.push('/login');
    } catch(e) {console.log(e)}
  });
</script>