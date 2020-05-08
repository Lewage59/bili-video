<template>
  <div class="switcher" ref="switcher" :class="switcherType">
    <div class="switcher-tab" v-for="(item, index) in list" :key="index" :class="{active : index === indexTab}" @click="switchTab(index)">
      <span>{{item.name}}</span>
    </div>
    <div ref="anchor" class="switcher-header-anchor"></div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    },
    indexTab: {
      type: Number,
      default: 0
    },
    displayType: {
      type: String, // start居左，around居中
      default: 'start'
    }
  },
  computed: {
    switcherType () {
      return this.displayType === 'start' ? 'switcher-start' : 'switcher-around'
    }
  },
  created () {
    setTimeout(() => {
      this.moveAnchor(this.indexTab)
    }, 20)
  },
  methods: {
    switchTab (index) {
      if (this.indexTab !== index) {
        this.$emit('switchTab', index)
      }
    },
    moveAnchor (index) {
      let tab = this.$refs.switcher.childNodes[index]
      this.$refs.anchor.style['transform'] = `translateX(${tab.offsetLeft + 16}px)`
      this.$refs.anchor.style.width = tab.offsetWidth - 32 + 'px'
    }
  },
  watch: {
    indexTab (newIndex) {
      if (newIndex || newIndex === 0) {
        setTimeout(() => {
          this.moveAnchor(newIndex)
        }, 20)
      }
    }
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
@import '~common/stylus/variable.styl';

.switcher {
  position: relative;
  display: flex;
  flex-direction: row;
  font-size: $font-size-medium;

  &.switcher-around {
    justify-content: space-evenly;
  }

  &.switcher-start {
    justify-content: flex-start;
  }

  .switcher-tab {
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    height: 40px;
    line-height: 40px;
    white-space: nowrap;
    padding: 0 16px;
    color: #505050;

    &.active {
      color: $color-theme;
    }
  }

  .switcher-header-anchor {
    display: block;
    position: absolute;
    width: 0;
    left: 0;
    bottom: 0;
    height: 2px;
    border-radius: 2px;
    background: $color-theme;
    transition: 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
}
</style>
