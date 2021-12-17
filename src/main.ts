import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import App from './App'

import router from '@/router'
import { store } from '@/store'
import '@/scss/common.scss'

createApp(App).use(router).use(store).use(Antd).mount('#app')
