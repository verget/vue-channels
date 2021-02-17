<template>
  <button
    type="button"
    class="inline-flex border border-gray-300 rounded-full py-2 px-5 shadow-sm text-sm leading-4 font-bold focus:outline-none mr-2"
    :class="computedClasses"
    @click="triggerClick"
  >
    {{ title }}
  </button>
</template>

<script>
export default {
  name: 'CustomButton',
  props: {
    title: {
      type: String,
      default: 'Button'
    },
    type: {
      type: String,
      default: 'default'
    }
  },
  computed: {
    computedClasses () {
      let classes = ''
      switch (this.type) {
        case 'primary':
          classes = 'border-gray-300 text-white bg-black hover:bg-gray-700'
          break
        default:
          classes = 'border-transparent text-gray-700 bg-white hover:bg-gray-50'
      }
      return classes
    }
  },
  methods: {
    triggerClick () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
