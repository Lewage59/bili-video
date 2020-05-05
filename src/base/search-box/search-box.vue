<template>
  <div class="search-box">
    <i class="icon-sousuo"></i>
    <input ref="query" class="box" v-model="query" :placeholder="defaultWord.show_name">
    <i class="icon-shanchu" @click="clear" v-show="query"></i>
  </div>
</template>

<script type="ecmascript-6">
import { debounce } from 'common/js/util'

export default {
  data () {
    return {
      query: ''
    }
  },
  props: {
    defaultWord: {
      type: Object,
      default: null
    }
  },
  computed: {
    getBvid () {
      return this.defaultWord.url
    }
  },
  created () {
    this.$watch('query', debounce((newQuery) => {
      this.$emit('query', newQuery)
    }, 200))
  },
  methods: {
    clear () {
      this.query = ''
    }
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
@import '~common/stylus/variable.styl';

.search-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  width: 100%;
  height: 30px;
  padding: 0 12px;
  margin-top: 7px;
  background: $color-background-tag;
  border-radius: 3px;

  .icon-sousuo {
    font-size: $font-size-medium-x;
    color: #a0a0a0;
  }

  .box {
    flex: 1;
    margin: 0 5px;
    font-size: $font-size-small-x;
    background: $color-background-tag;
    border: none;
    outline: medium;
  }

  .icon-shanchu {
    color: #a0a0a0;
    font-size: $font-size-medium;
  }
}
</style>
