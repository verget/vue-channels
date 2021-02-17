<template>
  <div>
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
      @keyup.enter="submit"
    />
  </div>
</template>

<script>
export default {
  name: 'Search',
  data () {
    return {
      titleInput: ''
    }
  },
  methods: {
    submit () {
      this.$emit('done', this.titleInput)
      this.titleInput = ''
    }
  }
}
</script>
