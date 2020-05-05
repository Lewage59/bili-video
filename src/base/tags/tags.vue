<template>
  <div class="tags">
    <span v-for="(item, index) in list" :key="index">{{item.tag_name}}</span>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
@import '~common/stylus/variable.styl';

.tags {
  span {
    display: inline-block;
    padding: 8px 18px;
    margin: 0 10px 6px 0;
    color: $color-text-tag;
    font-size: $font-size-small;
    background: $color-background-tag;
    border-radius: 38px;
  }
}
</style>
