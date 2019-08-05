import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import { routes } from './routes'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Router)
Vue.use(BootstrapVue)

const router = new Router({
	routes,
	mode: 'history'
})

new Vue({
  	el: '#app',
	router,
router,
  	render: h => h(App)
})
