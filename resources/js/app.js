import {createApp} from 'vue'

import App from './App.vue'
import router from './src/router'
import VueDragTree from 'vue-drag-tree'
import store from './src/store'
import 'bootstrap/dist/css/bootstrap.css'
import 'boxicons/css/boxicons.min.css'

const app = createApp(App)


app.use(router)
app.use(store)

app.mount("#app")