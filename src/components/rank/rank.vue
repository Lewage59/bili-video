<template>
  <div class="rank">
    <div class="navbar-rank">
      <div class="navbar-box">
        <div class="back" @click="back ">
          <i class="icon-zuojiantou1"></i>
        </div>
        <div class="title " @click="toTop">排行榜</div>
      </div>
    </div>
    <div class="rank-channel-menu border-bottom">
      <slider class="switcher-wrapper" :data="regionTags">
        <switcher :list="regionTags" displayType="start" :indexTab="indexTab" @switchTab="changeContent"></switcher>
      </slider>
    </div>
    <scroll :data="rankList" :bounce="bounce" class="video-list-wrapper" ref="list">
      <router-view @changeTab="changeTab" :list="rankList" :rank="rank"></router-view>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import { regionTags, ERR_OK } from 'api/config'
import { getRank } from 'api/rank'
import Slider from 'base/slider/slider'
import Switcher from 'base/switcher/switcher'
import Scroll from 'base/scroll/scroll'

export default {
  data () {
    return {
      regionTags,
      indexTab: 0,
      rankList: [],
      bounce: false,
      rank: true
    }
  },
  created () {
    setTimeout(() => {
      this._getRank()
      this.setRegionName()
    }, 20)
  },
  methods: {
    _getRank () {
      let rid = this.regionTags[this.indexTab].key
      getRank(rid, 3).then(res => {
        if (res.data.code === ERR_OK) {
          this.rankList = res.data.data.list
        }
      })
    },
    back () {
      this.$router.push({ path: '/home' })
    },
    toTop () {
      if (this.$refs.list) {
        this.$refs.list.scrollTo(0, 0, 500)
      }
    },
    changeContent (index) {
      this.$router.push({
        path: `/rank/${index}`
      })
    },
    changeTab (index) {
      this.toTop()
      this.indexTab = index
    },
    setRegionName () {
      this.regionTags[0].name = '全站'
    }
  },
  watch: {
    indexTab () {
      this._getRank()
    }
  },
  components: {
    Slider,
    Switcher,
    Scroll
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
@import '~common/stylus/variable.styl';

.rank {
  position: relative;

  .navbar-rank {
    position: fixed;
    top: 0;
    left: 0;
    height: 44px;
    width: 100%;
    z-index: 99;

    .navbar-box {
      justify-content: center;
      line-height: 44px;
      padding: 0 18px;
      background-color: $color-theme;

      .back {
        display: inline-block;
        height: 100%;

        .icon-zuojiantou1 {
          color: $color-icon;
        }
      }

      .title {
        position: absolute;
        left: 50%;
        display: inline-block;
        transform: translateX(-50%);
        color: $color-icon;
      }
    }
  }

  .rank-channel-menu {
    height: 40.5px;
    margin-top: 44px;

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

  .video-list-wrapper {
    position: fixed;
    overflow: hidden;
    height: 100%;
    width: 100%;
  }
}
</style>
