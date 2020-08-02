<template>
  <div class="channel">
    <div class="sub-channel-menu border-bottom">
      <slider class="switcher-wrapper" :data="getBlocks">
        <switcher :list="getBlocks" displayType="start" :indexTab="sindexTab" @switchTab="changeContent"></switcher>
      </slider>
    </div>
    <scroll class="content-wrapper" ref="content" :data="regionList" :bounce="bounce">
      <div>
        <ul class="recommend" v-if="!$route.params.sindex && regionList">
          <li class="list-group" v-for="(list, index) in regionList" :key="index">
            <div class="list-bar">
              <span class="title">{{getRegionName(index)}}</span>
              <span class="rank-more" v-if="index === 0" @click="toRank()">
                <i class="icon-paixingbang"></i>
                排行榜
                <i class="icon-youjiantou"></i>
              </span>
              <span class="more" v-else @click="toMore(index)">
                查看更多
                <i class="icon-youjiantou"></i>
              </span>
            </div>
            <div class="list-group-item">
              <card-list @select="selectItem" :list="list"></card-list>
            </div>
          </li>
        </ul>
        <div class="loading-container" v-show="!regionList">
          <loading title=""></loading>
        </div>
        <keep-alive>
          <router-view :key="key"></router-view>
        </keep-alive>
        <div class="block-box"></div>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascirpt-6">
import { regionTags, ERR_OK } from 'api/config'
import { getRegion } from 'api/partition'
import Slider from 'base/slider/slider'
import Switcher from 'base/switcher/switcher'
import cardList from 'base/card-list/card-list'
import Loading from 'base/loading/loading'
import Scroll from 'base/scroll/scroll'

export default {
  data () {
    return {
      indexTab: 0,
      sindexTab: 0,
      regionTags: regionTags,
      regionList: []
    }
  },
  created () {
    this.bounce = false
    this._getIndexTab()
    setTimeout(() => {
      this._getRegion()
    }, 20)
  },
  computed: {
    getBlocks () {
      return regionTags[this.indexTab].blocks
    },
    key () {
      return this.$route.fullPath
    }
  },
  methods: {
    _getIndexTab () {
      if (isNaN(this.$route.params.index)) {
        this.indexTab = 0
      } else {
        this.indexTab = this.$route.params.index
        this.sindexTab = this.$route.params.sindex || 0
      }
    },
    _getRegion () {
      if (!this.indexTab) {
        return
      }
      let arr = []
      let index = parseInt(this.indexTab)
      let blocks = this.regionTags[index].blocks
      // 确保异步请求按规定顺序执行
      blocks.forEach(item => {
        arr.push(getRegion(-1, item.key))
      })
      Promise.all(arr).then(res => {
        res.forEach(item => {
          if (item.data.code === ERR_OK) {
            item.data.data.archives.length = 4
            this.regionList.push(item.data.data.archives)
          }
        })
      })
    },
    changeContent (index) {
      if (index === 0) {
        this.sindexTab = 0
        this.$router.push({
          path: `/channel/${this.indexTab}`
        })
      } else {
        this.sswitchTab(index)
        this.$router.push({
          path: `/channel/${this.indexTab}/${index}`
        })
      }
    },
    sswitchTab (index) {
      this.$refs.content.scrollTo(0, 0, 500)
      this.sindexTab = index
    },
    selectItem (item) {
      this.$router.push({ name: 'video', params: { bvid: item.bvid } })
    },
    getRegionName (index) {
      if (!this.indexTab) {
        return
      }
      return this.regionTags[this.indexTab].blocks[index].name
    },
    toMore (index) {
      this.$router.push({
        path: `/channel/${this.indexTab}/${index}`
      })
    },
    toRank () {
      this.$router.push({ path: `/rank/${this.indexTab}` })
    }
  },
  watch: {
    '$route' () {
      let routeIndex = this.$route.params.index
      if (this.indexTab !== routeIndex) {
        this._getIndexTab()
        this.regionList = []
        setTimeout(() => {
          this._getRegion()
        }, 20)
      }
    }
  },
  components: {
    Slider,
    Switcher,
    cardList,
    Loading,
    Scroll
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
@import '~common/stylus/variable.styl';

.block-box {
  width: 100%;
  padding-top: 130px;
}

.channel {
  position: relative;

  .sub-channel-menu {
    height: 40.5px;

    .switcher-wrapper {
      position: fixed;
      left: 0;
      right: 0;
      overflow: hidden;
      z-index: 99;
      white-space: nowrap;
      background: $color-background;
    }
  }

  .content-wrapper {
    position: fixed;
    overflow: hidden;
    height: 100%;

    .recommend {
      padding-top: 10px;
      font-size: $font-size-medium-x;
      color: $color-text;

      .list-group {
        padding: 0 5px;
        margin-bottom: 20px;

        .list-bar {
          display: flex;
          justify-content: space-between;
          padding: 5px 10px;
          font-size: $font-size-medium;

          .title {
            font-size: 15px;
          }

          .rank-more {
            color: #ffa726;
          }

          .more {
            color: $color-text-video;
          }
        }

        .list-group-item {
        }
      }
    }

    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
