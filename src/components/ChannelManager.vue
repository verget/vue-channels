<template>
  <div
    class="w-11/12 sm:w-6/12 lg:w-4/12 xl:w-3/12 bg-white border-2 border-gray-300 p-6 tracking-wide shadow-lg"
  >
    <h3 class="font-bold text-2xl mb-5">Channels</h3>
    <div class="mt-1 relative shadow-sm mb-4">
      <div
        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
      >
        <fai class="text-gray-300" icon="search" />
      </div>
      <input
        v-model="titleInput"
        type="text"
        name="search"
        class="block w-full py-1.5 pl-9 pr-12 text-base border text-md font-bold border-gray-200 text-gray-500 rounded-full focus:outline-none"
        placeholder="Add channels"
        @keyup.enter="createItem"
      />
    </div>
    <div class="mb-4">
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
        <button
          type="button"
          class="inline-flex border border-gray-300 rounded-full py-2 px-5 shadow-sm text-sm leading-4 font-bold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none mr-2"
          @click="resetState"
        >
          Cancel
        </button>
        <button
          type="button"
          class="inline-flex border border-transparent rounded-full py-2 px-5 shadow-sm text-sm leading-4 font-bold text-white bg-black hover:bg-gray-700 focus:outline-none"
          @click="saveState"
        >
          Apply
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import Channel from '@/components/Channel'
import { mapState } from 'vuex'

export default {
  name: 'ChannelManager',
  components: {
    Channel,
    draggable
  },
  data () {
    return {
      stateChanged: false,
      channelsSelected: [],
      titleInput: ''
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
    createItem () {
      if (!this.titleInput) return
      const newItem = {
        title: this.titleInput,
        icon: this.generateIcon(this.titleInput),
        id: this.generateId()
      }
      this.channelsSelected.push(newItem)
      this.titleInput = ''
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
