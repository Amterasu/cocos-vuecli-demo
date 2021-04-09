<template>
  <div id="app">
    <the-header></the-header>
    <router-view >
    </router-view>
  </div>
</template>

<script>
import creatorLoader from '../static/cocos-loader/creator-load'
import TheHeader from './views/header/TheHeader'

export default {
  name: 'electron-cocos',
  components: {
    TheHeader: TheHeader
  },
  created() {},
  methods: {}
}
</script>

<style>
/* CSS */
</style>
