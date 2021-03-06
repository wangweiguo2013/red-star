import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from "@vitejs/plugin-vue-jsx"
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx()
  ],
  resolve: {
      alias: {
          '@': resolve(__dirname, './src'), // 设置 `@` 指向 `src` 目录
      },
  },
  base: './', // 设置打包路径
})
