import Vue from 'vue'
import App from './App.vue'
import store from './store'
import './style.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEnvelope, faGripVertical, faPhoneAlt, faSearch } from '@fortawesome/free-solid-svg-icons'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faGripVertical, faSearch, faPhoneAlt, faEnvelope, faWhatsapp)

Vue.component('fai', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
