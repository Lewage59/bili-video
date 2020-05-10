<template>
  <div class="search-list">
    <ul>
      <li class="search-item border-bottom" v-for="(item, index) in searches" :key="index" @click="selectItem(item)">
        <i class="icon-lishijilu_huaban"></i>
        <span class="text">{{item}}</span>
        <i @click.stop="deleteItem(item)" class="icon-shanchu"></i>
      </li>
    </ul>
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
