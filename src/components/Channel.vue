<template>
  <div class="flex items-center">
    <span class="mr-3">
      <fai icon="grip-vertical" class="text-gray-300 cursor-move" />
    </span>
    <span class="border-transparent rounded-md bg-gray-200 mr-3 py-1 px-1.5">
      <fai :icon="data.icon" class="text-gray-400" />
    </span>
    <span class="font-bold mr-3"> {{ data.title }}</span>
    <div
      class="text-gray-500 text-sm ml-auto cursor-pointer font-bold"
      @click="emitRemove"
    >
      Remove
    </div>
  </div>
</template>

<script>
export default {
  name: 'Channel',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  methods: {
    emitRemove () {
      this.$emit('remove')
    }
  }
}
</script>
