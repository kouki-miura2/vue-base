import './assets/main.css'
import { createApp } from 'vue'
// Vue Router // 追加
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'

// 追加
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

import App from './App.vue'

// Vue Router // 追加
const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 追加
// Vuetify
const vuetify = createVuetify({
  components,
  directives,
})

createApp(App)
  .use(router)
  .use(vuetify) // 追加
  .mount('#app')
