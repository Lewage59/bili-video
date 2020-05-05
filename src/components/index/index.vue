<template>
  <div class="index">
    <m-header :indexTab="indexTab"></m-header>
    <keep-alive>
      <router-view @switchTab="switchTab"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import mHeader from 'components/m-header/m-header'
export default {
  data () {
    return {
      indexTab: 0
    }
  },
  components: {
    mHeader
  },
  methods: {
    switchTab (index) {
      this.indexTab = index
    }
  }
}
</script>

<style>
</style>
