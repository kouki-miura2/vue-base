import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite' // 追加

export default defineConfig({
  plugins: [
    vue(),
    // 追加
    VueRouter({
      routesFolder: 'src/pages',
      dts: './types/typed-router.d.ts',
    }),
  ],
})
