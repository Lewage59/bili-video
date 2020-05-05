<template>
  <div class="search-box">
    <i class="icon-sousuo"></i>
    <input type="text" ref="query" class="box" :placeholder="defaultWord.show_name">
    <i class="icon-shanchu"></i>
  </div>
</template>

<script type="ecmascript-6">
import { ERR_OK } from 'api/config'
import { getSearchDefaultWords } from 'api/search'

export default {
  data () {
    return {
      defaultWord: {}
    }
  },
  computed: {
    getBvid () {
      return this.defaultWord.url
    }
  },
  created () {
    setTimeout(() => {
      this._getSearchDefaultWords()
    }, 20)
  },
  methods: {
    _getSearchDefaultWords () {
      getSearchDefaultWords().then(res => {
        if (res.data.code === ERR_OK) {
          this.defaultWord = res.data.data
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
.search-box {
  display: flex;
}
</style>
