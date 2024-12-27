import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import qiankun from 'vite-plugin-qiankun';

const useDevMode = true

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    qiankun('sub-vue', {
      useDevMode
    }),
  ],
  base: '/',
  server:{
    port:5175,
    cors:true,
    origin: 'http://localhost5175'
  }
})
