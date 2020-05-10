<template>
  <div class="suggest">
    <ul class="suggest-list">
      <li class="suggest-item border-bottom" @click="selectItem" v-for="(item, index) in result" :key="index" v-html="$options.filters.setHighlight(item.name, query)"></li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
import { getSuggest } from 'api/search'
import { setHighlight } from 'common/js/util'

export default {
  data () {
    return {
      result: {}
    }
  },
  props: {
    query: {
      type: String,
      default: ''
    }
  },
  methods: {
    search () {
      if (!this.query) {
        return
      }
      getSuggest(this.query).then(res => {
        this.result = res.data
      })
    },
    selectItem () {
      this.$emit('select')
    }
  },
  filters: {
    setHighlight (item, query) {
      return setHighlight(query, item, 'ligh-hight')
    }
  },
  watch: {
    query () {
      this.search()
    }
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
@import '~common/stylus/variable.styl';

.suggest {
  padding-left: 12px;
  background: $color-background;

  .suggest-list {
    .suggest-item {
      height: 44px;
      line-height: 44px;
      font-size: $font-size-medium;
      color: $color-text-comment;

      &>>>.ligh-hight {
        color: $color-theme;
        font-style: normal;
      }
    }
  }
}
</style>
