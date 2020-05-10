import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueLazyload from 'vue-lazyload'
import store from './store'

import 'swiper/dist/css/swiper.css'

import 'common/stylus/index.styl'

Vue.use(VueAwesomeSwiper)

// or with options
Vue.use(VueLazyload, {
  loading: require('common/image/loading.png')
})

Vue.config.productionTip = false
fastclick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
