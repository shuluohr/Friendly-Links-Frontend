import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Vant from 'vant';
import 'vant/lib/index.css';
import router from './config/route.ts'

const app = createApp(App);
app.use(Vant);
app.use(router)
app.mount('#app');


