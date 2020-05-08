<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'

export default {
  mounted () {
    setTimeout(() => {
      this._setSliderWidth()
      this._initScroll()
    }, 20)
  },
  methods: {
    _setSliderWidth () {
      this.children = this.$refs.wrapper.children[0].children
      let width = 0

      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        width += child.clientWidth
      }

      this.$refs.wrapper.children[0].style.width = width + 'px'
    },
    _initScroll () {
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        scrollX: true,
        scrollY: false,
        momentum: false,
        bounce: false
      })
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
