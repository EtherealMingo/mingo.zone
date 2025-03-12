import { createApp } from 'vue'
import { createPinia } from 'pinia'
<<<<<<< HEAD
import App from './App.vue'
import router from './router'
import './styles/tailwind.css'
=======

import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import "tailwindcss/tailwind.css"
import 'element-plus/dist/index.css'
>>>>>>> 6ac7edc21728880c9b6a1489730bd3a1592767b0

const app = createApp(App)

app.use(createPinia())
app.use(router)
<<<<<<< HEAD

app.mount('#app')
=======
app.use(ElementPlus)

app.mount('#mingoZone')
>>>>>>> 6ac7edc21728880c9b6a1489730bd3a1592767b0
