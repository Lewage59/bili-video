<template>
  <div class="search">
    <div class="header">
      <div class="search-box-wrapper">
        <search-box :defaultWord="defaultWord" @query="changeQuery"></search-box>
      </div>
      <router-link to="/" class="cancel">取消</router-link>
    </div>
    <div class="search-info" v-show="!query">
      <div class="search-hot">
        <h2 class="title">大家都在搜</h2>
        <div class="list">
          <span v-for="(item, index) in hotwords" :key="index" class="hotword-item">{{item.keyword}}</span>
        </div>
      </div>
      <div class="search-history">
        <h2 class="title">历史搜索</h2>
        <search-list></search-list>
        <div class="clear-history"></div>
      </div>
    </div>
    <div class="search-result" v-show="query">
      <suggest :query="query"></suggest>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { ERR_OK } from 'api/config'
import { getSearchDefaultWords, getHotWords } from 'api/search'
import SearchBox from 'base/search-box/search-box'
import SearchList from 'base/search-list/search-list'
import Suggest from 'components/suggest/suggest'

export default {
  data () {
    return {
      defaultWord: {},
      hotwords: [],
      query: ''
    }
  },
  created () {
    setTimeout(() => {
      this._getSearchDefaultWords()
      this._getHotWords()
    }, 20)
  },
  methods: {
    _getSearchDefaultWords () {
      getSearchDefaultWords().then(res => {
        if (res.data.code === ERR_OK) {
          this.defaultWord = res.data.data
        }
      })
    },
    _getHotWords () {
      getHotWords().then(res => {
        if (res.data.code === ERR_OK) {
          this.hotwords = res.data.list
        }
      })
    },
    changeQuery (query) {
      this.query = query
    }
  },
  components: {
    SearchBox,
    SearchList,
    Suggest
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
@import '~common/stylus/variable.styl';

.search {
  width: 100%;
  height: 100%;
  background: $color-background-tag;

  .header {
    position: fixed;
    display: flex;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 44px;
    padding: 0 12px;
    z-index: 2;
    box-sizing: border-box;
    background: $color-background;

    .search-box-wrapper {
      flex: 1;
      display: inline-block;
      margin-right: 12px;
    }

    .cancel {
      display: inline-block;
      line-height: 44px;
      font-size: $font-size-medium-x;
      color: $color-theme;
    }
  }

  .search-info {
    .search-hot {
      width: 100%;
      margin-top: 14px;
      padding: 44px 12px 25px;
      box-sizing: border-box;
      background: $color-background;

      .title {
        color: #999999;
        font-size: $font-size-medium;
      }

      .list {
        height: 92px;
        overflow: hidden;

        .hotword-item {
          display: inline-block;
          height: 32px;
          line-height: 32px;
          margin: 12px 10px 0 0;
          padding: 0 12px;
          font-size: $font-size-small-x;
          color: $color-text-tag;
          border: 1px solid #ccc;
          border-radius: 34px;
        }
      }
    }

    .search-history {
      margin-top: 10px;
      background: $color-background;

      .title {
        height: 46px;
        line-height: 46px;
        padding-left: 12px;
        font-size: $font-size-medium;
        color: $color-text-video;
      }
    }
  }
}
</style>
