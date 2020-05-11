<template>
  <div class="search-list">
    <transition-group tag="ul" name="list">
      <li class="search-item border-bottom" v-for="item in searches" :key="item" @click="selectItem(item)">
        <i class="icon-lishijilu_huaban"></i>
        <span class="text">{{item}}</span>
        <i @click.stop="deleteItem(item)" class="icon-shanchu"></i>
      </li>
    </transition-group>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    searches: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    selectItem (item) {
      this.$emit('select', item)
    },
    deleteItem (item) {
      this.$emit('delete', item)
    }
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
@import '~common/stylus/variable.styl';

.search-list {
  padding-left: 12px;

  .search-item {
    display: flex;
    align-items: center;
    height: 44px;
    line-height: 44px;

    &.list-enter-active, &.list-leave-active {
      transition: all 0.2s;
    }

    &.list-enter, &.list-leave-to {
      height: 0;
      opacity: 0;
    }

    .icon-lishijilu_huaban {
      margin-right: 6px;
      font-size: $font-size-large;
      color: $color-text-video;
    }

    .text {
      flex: 1;
      font-size: $font-size-medium;
      color: $color-text-tag;
    }

    .icon-shanchu {
      padding: 12px;
      font-size: $font-size-medium;
      color: $color-text-video;
    }
  }
}
</style>
