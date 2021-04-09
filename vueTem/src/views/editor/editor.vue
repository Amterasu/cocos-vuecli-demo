<template>
  <div class="editor">
    <center-panel></center-panel>
    <right-panel></right-panel>
  </div>
</template>

<script>
import centerPanel from './centerPanel'
import rightPanel from './rightPanel'

export default {
  name: 'electron-cocos',
  components: {
    centerPanel,
    rightPanel,
  },
  created() {},
  methods: {},
}
</script>

<style scoped>
.editor {
  width: 100%;
  height: 100%;
}
</style>
