import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'

export default defineConfig({
  plugins: [
    vue(),
    VueRouter({
      routesFolder: 'src/pages',
      dts: './types/typed-router.d.ts',
    }),
  ],
  base: '/myapp',
})
