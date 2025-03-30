import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import { RouterLink } from 'vue-router'
import { createPinia } from 'pinia'
import "boxicons/css/boxicons.css";

const app = createApp(App)
const pinia = createPinia()

app.use(router).use(RouterLink).use(pinia);

app.mount('#app')
