<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'

export default {
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  mounted () {
    setTimeout(() => {
      this._initScroll()
    }, 200)
    // 当窗口大小发生变化是重新计算宽度
    window.addEventListener('resize', () => {
      if (!this.scroll) {
        return
      }
      this.scroll.refresh()
    })
  },
  methods: {
    _initScroll () {
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        scrollX: true,
        scrollY: false,
        momentum: false,
        bounce: false
      })
    },
    refresh () {
      this.scroll && this.scroll.refresh()
    },
    scrollTo () {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement () {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
  },
  watch: {
    data () {
      setTimeout(() => {
        this.refresh()
      }, 20)
    }
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
</style>
