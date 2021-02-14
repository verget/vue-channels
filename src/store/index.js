import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    channels: []
  },
  mutations: {
    SET_CHANNELS (state, data) {
      state.channels = data
    }
  }
})
