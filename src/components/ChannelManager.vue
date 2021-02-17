<template>
  <div
    class="w-11/12 sm:w-6/12 lg:w-4/12 xl:w-3/12 bg-white border-2 border-gray-300 p-6 tracking-wide shadow-lg"
  >
    <h3 class="font-bold text-2xl mb-5">Channels</h3>
    <div class="mt-1 relative shadow-sm mb-4">
      <search @done="createItem" />
    </div>
    <div class="mb-4 overflow-auto h-56">
      <draggable
        v-if="channelsSelected.length"
        v-model="channelsSelected"
        group="channels"
        ghost-class="ghost"
        @change="onDrag"
      >
        <transition-group name="list" tag="p">
          <channel
            v-for="element in channelsSelected"
            :key="element.id"
            :data="element"
            class="mb-4"
            @remove="removeItem(element.id)"
          />
        </transition-group>
      </draggable>
      <div v-else class="text-center">No elements</div>
    </div>
    <hr class="mb-5" />
    <transition name="fade">
      <div v-if="stateChanged" class="text-right">
        <CustomButton
          class="mr-2"
          title="Cancel"
          type="primary"
          @click="resetState"
        />
        <CustomButton title="Apply" type="default" @click="saveState" />
      </div>
    </transition>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import Channel from '@/components/Channel'
import Search from '@/components/Search'
import CustomButton from '@/components/CustomButton'
import { mapState } from 'vuex'

export default {
  name: 'ChannelManager',
  components: {
    Channel,
    Search,
    CustomButton,
    draggable
  },
  data () {
    return {
      stateChanged: false,
      channelsSelected: []
    }
  },
  computed: {
    ...mapState(['channels'])
  },
  watch: {
    channels: function (value) {
      this.channelsSelected = [...value]
    }
  },
  methods: {
    removeItem (id) {
      this.channelsSelected = this.channelsSelected.filter(element => element.id !== id)
      this.stateChanged = true
    },
    createItem (input) {
      if (!input) return
      const newItem = {
        title: input,
        icon: this.generateIcon(input),
        id: this.generateId()
      }
      this.channelsSelected.unshift(newItem)
      this.stateChanged = true
    },
    generateId () {
      if (!this.channelsSelected.length) return 1
      const ids = this.channelsSelected.map(el => el.id)
      return Math.max(...ids) + 1
    },
    generateIcon (title) {
      const searchString = title.toLowerCase()
      let icon = ['fas', 'address-book']
      const iconsPull = [
        {
          keywords: ['mail', '@', '.com'],
          icon: ['fas', 'envelope']
        },
        {
          keywords: ['phone', 'call', 'number'],
          icon: ['fas', 'phone-alt']
        },
        {
          keywords: ['whatsapp'],
          icon: ['fab', 'whatsapp']
        }
      ]
      for (const one of iconsPull) {
        if (one.keywords.some(el => searchString.includes(el))) {
          icon = one.icon
          break
        }
      }
      return icon
    },
    onDrag () {
      this.stateChanged = true
    },
    resetState () {
      this.channelsSelected = [...this.channels]
      this.stateChanged = false
    },
    saveState () {
      this.$store.commit('SET_CHANNELS', this.channelsSelected)
      this.stateChanged = false
    }
  }
}
</script>

<style scoped>
.ghost {
  opacity: 0.5s;
  background: #c8ebfb;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
