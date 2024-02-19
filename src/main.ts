import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './modules/tailwindcss.css'
// import { vDrag } from './modules/drag'
import VueDraggableResizable from 'vue-draggable-resizable'
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
import ContextMenu from '@imengyu/vue3-context-menu'
const Vue = createApp(App)
// Vue.directive('drag', vDrag)
Vue.use(store)
Vue.use(router)
Vue.use(ContextMenu);

Vue.component("vue-draggable-resizable", VueDraggableResizable)
Vue.mount('#app')
// createApp(App).use(store).use(router).mount('#app')



