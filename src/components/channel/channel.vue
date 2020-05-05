<template>
  <div class="channel">{{indexTab}}</div>
</template>

<script type="text/ecmascirpt-6">
import { categoryTypes } from 'api/config'

export default {
  data () {
    return {
      indexTab: 0,
      menuList: categoryTypes
    }
  },
  created () {
    this._getIndexTab()
  },
  methods: {
    _getIndexTab () {
      if (isNaN(this.$route.params.index)) {
        this.indexTab = 0
      } else {
        this.indexTab = this.$route.params.index
      }
      this.$emit('switchTab', parseInt(this.indexTab))
    }
  },
  watch: {
    '$route' () {
      this._getIndexTab()
    }
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
</style>
