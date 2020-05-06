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
      type: Array | Object,
      default: null
    },
    probeType: { // 触发滚动事件的类型
      type: Number,
      default: 1
    },
    click: { // 是否可以点击
      type: Boolean,
      default: true
    },
    listenScroll: { // 是否监听滚动事件
      type: Boolean,
      default: false
    },
    pullup: { // 是否可以拉起
      type: Boolean,
      default: false
    },
    beforeScroll: {
      type: Boolean,
      default: false
    },
    refreshDelay: { // 刷新延迟
      type: Number,
      default: 20
    },
    bounce: {
      type: Boolean,
      default: true
    }
  },
  mounted () {
    setTimeout(() => {
      this._initScroll()
    }, 20)
  },
  methods: {
    _initScroll () {
      if (!this.$refs.wrapper) {
        return
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        bounce: this.bounce
      })
      if (this.pullup) { // 滚动结束时触发
        this.scroll.on('scrollEnd', () => {
          if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
            this.$emit('scrollToEnd')
          }
        })
      }
    },
    disable () {
      this.scroll && this.scroll.disable()
    },
    enable () {
      this.scroll && this.scroll.enable()
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
      }, this.refreshDelay)
    }
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
</style>
