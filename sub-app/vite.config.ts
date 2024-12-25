import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
// import react from '@vitejs/plugin-react'
import qiankun from 'vite-plugin-qiankun';

// useDevMode 开启时与热更新插件冲突
const useDevMode = true

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    ...(
      useDevMode ? [] : [
        reactRefresh()
      ]
    ),
    qiankun('sub-app', { useDevMode }),
  ],
  base: '/',  // 使用相对路径
  server: {
    port: 5174,  // 子应用端口
    cors: true,
  },
  // build: {
  //   rollupOptions: {
  //     output: {
  //       format: 'umd',  // 输出为 UMD 格式
  //       name: 'subApp',  // 设置子应用全局变量名
  //     },
  //   },
  // },
})
