import { createLocalVue, shallowMount } from '@vue/test-utils'
import Channel from '@/components/Channel.vue'
const localVue = createLocalVue()

let fakeChannel = {
  id: 1,
  title: 'Fake Channel',
  icon: [
    'fas',
    'envelope'
  ]
}

describe('Channel', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Channel,
      {
        localVue,
        propsData: { data: fakeChannel },
        stubs: {
          fai : true
        }
      }
    )
  })

  it('should be defined', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  it('renders props title when passed', () => {
    expect(wrapper.html()).toContain('Fake Channel')
  })
  
  it('emmits correct call when remove click triggered', () => {
    const button = wrapper.find('.remove-area')
    button.trigger('click')
    expect(wrapper.emitted().remove).toBeTruthy()
  })
})
