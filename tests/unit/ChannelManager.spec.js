import { createLocalVue, shallowMount } from '@vue/test-utils'
import ChannelManager from '@/components/ChannelManager.vue'
import Vuex from 'vuex'
import Vue from 'vue'
import draggable from 'vuedraggable'

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(draggable)

describe('ChannelManager', () => {
  let wrapper
  let store
  let state
  let mutations

  beforeEach(() => {
    state = {
      channels: []
    }
    mutations = {
      SET_CHANNELS: jest.fn()
    }
    store = new Vuex.Store({
      state,
      mutations
    })
    wrapper = shallowMount(ChannelManager,
      {
        localVue,
        store,
        stubs: {
          fai: true,
          draggable: true
        }
      }
    )
  })

  it('should be defined', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  it('renders correct title', () => {
    expect(wrapper.html()).toContain('Channels')
  })

  it('shows empty string when its no channels', () => {
    expect(wrapper.html()).toContain('No elements')
  })

  it('should triggers state mutation', () => {
    wrapper.vm.saveState()
    expect(mutations.SET_CHANNELS).toHaveBeenCalled()
  })

  it('should shows apply button only if local state was changed', async () => {
    expect(wrapper.html()).not.toContain('Apply')
    expect(wrapper.vm.stateChanged).not.toBeTruthy()
    wrapper.vm.onDrag()
    await Vue.nextTick()
    expect(wrapper.vm.stateChanged).toBeTruthy()
    expect(wrapper.html()).toContain('Apply')
  })
})
