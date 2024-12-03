import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'

import '@/scss/bootstrap.scss'
import 'bootstrap'

createApp(App).use(router).use(createPinia()).mount('#app')
