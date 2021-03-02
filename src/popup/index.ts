import { createApp } from 'vue'
import App from './App/App.vue'
import store from '../store'


// import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
// import './style/element-variables.scss'


createApp(App).use(store).mount('#app')

