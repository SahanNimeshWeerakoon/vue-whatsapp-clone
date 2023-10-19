import GoogleSignInPlugin from "vue3-google-signin"
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from '@/router'

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(GoogleSignInPlugin, {
    clientId: '441393468153-li4ugutm9pc4a2ika0p6vvbflrh4hp68.apps.googleusercontent.com',
});

app.mount('#app')
