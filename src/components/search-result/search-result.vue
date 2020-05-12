<template>
  <div class="search-result">
    <div class="switcher-wrapper" v-if="switchList.length">
      <switcher :list="switchList" :indexTab="indexTab" @switchTab="changeContent" displayType="between"></switcher>
    </div>
    <div class="result-panel" v-show="indexTab === 0 && resultList.length">
      <scroll :data="resultList" class="result-wrapper" :bounce="bounce">
        <div>
          <div class="order-tabs border-bottom" rel="order">
            <span class="order-tab-item" v-for="(item, index) in orderTabs" :key="index" :class="{active : index === orderIndex}" @click="changeOrder(index)">{{item}}</span>
          </div>
          <div class="result-list" v-show="resultList.length">
            <video-list :list="resultList"></video-list>
          </div>
        </div>
      </scroll>
    </div>
    <div class="loading-container" v-show="!resultList.length">
      <loading title=""></loading>
    </div>
    <div class="no-result" v-show="indexTab > 0">
      <span>尚未开发！</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { ERR_OK } from 'api/config'
import { getResultList, getResultTypeList } from 'api/search'
import Switcher from 'base/switcher/switcher'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'

// 此处组件设计不合法，待优化
import VideoList from 'components/video-list/video-list'

export default {
  data () {
    return {
      keyword: '',
      resultList: [],
      switchList: [{ name: '综合' }, { name: '番剧' }, { name: 'UP主' }, { name: '影视' }],
      orderTabs: ['默认排序', '播放多', '新发布', '弹幕多'],
      orderIndex: 0,
      indexTab: 0,
      bounce: false
    }
  },
  created () {
    this._getKeyWord()
    setTimeout(() => {
      this._getResultList()
    }, 20)
  },
  methods: {
    _getKeyWord () {
      this.keyword = this.$route.params.keyword
      this.$emit('keyword', this.keyword)
    },
    _getResultList () {
      getResultList(this.keyword, 1, 20).then(res => {
        if (res.data.code === ERR_OK) {
          this.resultList = res.data.data.result[8].data
        }
      })
    },
    changeContent (index) {
      this.indexTab = index
    },
    changeOrder (index) {
      if (this.orderIndex === index) {
        return
      }
      this.orderIndex = index
      let type = ''
      switch (index) {
        case 0:
          this._getResultList()
          return
        case 1:
          type = 'click'
          break
        case 2:
          type = 'pubdate'
          break
        case 3:
          type = 'dm'
          break
      }
      getResultTypeList(this.keyword, 1, 20, type).then(res => {
        if (res.data.code === ERR_OK) {
          this.resultList = []
          this.resultList = this.resultList.concat(res.data.data.result)
        }
      })
    }
  },
  watch: {
    '$route' () {
      this._getKeyWord()
      setTimeout(() => {
        this._getResultList()
      }, 20)
    }
  },
  components: {
    Switcher,
    VideoList,
    Scroll,
    Loading
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
@import '~common/stylus/variable.styl';

.search-result {
  position: fixed;
  top: 44px;
  left: 0;
  bottom: 0;
  width: 100%;
  background: $color-background;

  .switcher-wrapper {
    height: 44px;
    box-shadow: 0 1px 3px 1px #f4f4f4;
  }

  .result-panel {
    position: fixed;
    height: 100%;

    .result-wrapper {
      overflow: hidden;
      height: 100%;

      .order-tabs {
        display: flex;
        justify-content: space-between;
        height: 40px;
        width: 100%;
        padding: 0 16px;
        box-sizing: border-box;
        font-size: $font-size-medium;
        color: $color-text-tab;

        .order-tab-item {
          display: inline-block;
          vertical-align: middle;
          height: 40px;
          line-height: 40px;

          &.active {
            color: $color-theme;
          }
        }
      }
    }
  }

  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }

  .no-result {
    width: 100%;
    height: 200px;
    text-align: center;
    margin-top: 20px;
    color: $color-text-video;
  }
}
</style>
