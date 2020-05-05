<template>
  <div class="search-list">
    <ul>
      <li class="search-item border-bottom">
        <i class="icon-lishijilu_huaban"></i>
        <span class="text">123</span>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
export default {

}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
@import '~common/stylus/variable.styl';

.search-list {
  padding-left: 12px;

  .search-item {
    height: 44px;
    line-height: 44px;

    .icon-lishijilu_huaban {
      vertical-align: middle;
      font-size: $font-size-large;
      color: $color-text-video;
    }

    .text {
      vertical-align: middle;
      font-size: $font-size-medium;
      color: $color-text-tag;
    }
  }
}
</style>
