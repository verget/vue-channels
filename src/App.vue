<template>
  <div class="min-h-screen bg-gray-200 flex justify-center items-center">
    <ChannelManager />
  </div>
</template>

<script>
import ChannelManager from './components/ChannelManager.vue'
import { loadChannelsList } from '@/services/channel'

export default {
  name: 'App',
  components: {
    ChannelManager
  },
  mounted () {
    loadChannelsList() // suppose to be an api call to get the list of currently selected channels
      .then(response => {
        if (response && response.channels && response.channels.length) {
          this.$store.commit('SET_CHANNELS', response.channels)
        }
      })
  }
}
</script>
