import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { RouterLink } from 'vue-router'

const app = createApp(App)

app.use(router).use(RouterLink);

app.mount('#app')
