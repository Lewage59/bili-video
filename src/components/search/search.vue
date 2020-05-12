<template>
  <div class="search">
    <div class="header">
      <div class="search-box-wrapper">
        <search-box ref="searchBox" :defaultWord="defaultWord" @query="changeQuery" @enter="saveSearch"></search-box>
      </div>
      <router-link to="/" class="cancel">取消</router-link>
    </div>
    <div class="search-content">
      <scroll class="search-content-wrapper" :data="searchHistory">
        <div>
          <div class="search-info" v-show="!query">
            <div class="search-hot">
              <h2 class="title">大家都在搜</h2>
              <div class="list">
                <span @click="addQuery(item.keyword)" v-for="(item, index) in hotwords" :key="index" class="hotword-item">{{item.keyword}}</span>
              </div>
            </div>
            <div class="search-history">
              <h2 class="title">历史搜索</h2>
              <search-list :searches="searchHistory" @select="addQuery" @delete="deleteSearchHistory"></search-list>
              <div class="clear-history" v-show="searchHistory.length">
                <i class="icon-qingkongshanchu"></i>
                <span @click="clearSearchHistory">清空搜索记录</span>
              </div>
            </div>
          </div>
          <div class="search-result" v-show="!showResult && query">
            <suggest :query="query" @select="addQuery"></suggest>
          </div>
        </div>
      </scroll>
    </div>
    <router-view @keyword="getCurrentKeyword"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import { ERR_OK } from 'api/config'
import { getSearchDefaultWords, getHotWords } from 'api/search'
import SearchBox from 'base/search-box/search-box'
import SearchList from 'base/search-list/search-list'
import Scroll from 'base/scroll/scroll'
import Suggest from 'components/suggest/suggest'
import { searchMixin } from 'common/js/mixin'
import { mapActions } from 'vuex'

export default {
  mixins: [searchMixin],
  data () {
    return {
      defaultWord: {},
      hotwords: []
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
    getCurrentKeyword (keyword) {
      this.$refs.searchBox.setQuery(keyword)
    },
    ...mapActions([
      'clearSearchHistory'
    ])
  },
  components: {
    SearchBox,
    SearchList,
    Suggest,
    Scroll
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
    background: $color-theme;

    .search-box-wrapper {
      flex: 1;
      display: inline-block;
      margin-right: 12px;
    }

    .cancel {
      display: inline-block;
      line-height: 44px;
      font-size: $font-size-medium-x;
      color: $color-icon;
    }
  }

  .search-content {
    position: fixed;
    top: 44px;
    bottom: 0;
    width: 100%;

    .search-content-wrapper {
      overflow: hidden;
      height: 100%;

      .search-info {
        .search-hot {
          width: 100%;
          padding: 14px 12px 25px;
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
          border-top: 10px solid #f4f4f4;
          background: $color-background;

          .title {
            height: 46px;
            line-height: 46px;
            padding-left: 12px;
            font-size: $font-size-medium;
            color: $color-text-video;
          }
        }

        .clear-history {
          height: 46px;
          line-height: 46px;
          color: $color-text-video;
          font-size: $font-size-medium;
          text-align: center;
        }
      }
    }
  }
}
</style>
