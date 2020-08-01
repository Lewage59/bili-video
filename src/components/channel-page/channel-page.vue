<template>
  <div class="channel-page">
    <div class="content" v-if="regionList.length">
      <div class="list-bar">
        <span class="title">热门推荐</span>
      </div>
      <div class="list-group-item">
        <card-list @select="selectItem" :list="regionList"></card-list>
      </div>
    </div>
    <div class="loading-container" v-show="!regionList.length">
      <loading title=""></loading>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { regionTags, ERR_OK } from 'api/config'
import { getRegion } from 'api/partition'
import cardList from 'base/card-list/card-list'
import Loading from 'base/loading/loading'

export default {
  data () {
    return {
      indexTab: 0,
      sindexTab: 0,
      regionList: [],
      regionTags
    }
  },
  created () {
    this._getsIndexTab()
  },
  methods: {
    // 获取二级标签下标
    _getsIndexTab () {
      if (isNaN(this.$route.params.sindex)) {
        return
      }
      this.indexTab = this.$route.params.index
      this.sindexTab = this.$route.params.sindex
      this._getsRegion()
    },
    // 获取分区视频
    _getsRegion () {
      let index = parseInt(this.indexTab)
      let sindex = parseInt(this.sindexTab)
      let rid = this.regionTags[index].blocks[sindex].key
      getRegion(20, rid).then(res => {
        if (res.data.code === ERR_OK) {
          this.regionList = res.data.data.archives
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 跳转到视频播放详情页
    selectItem (item) {
      this.$router.push({ name: 'video', params: { bvid: item.bvid } })
    }
  },
  components: {
    cardList,
    Loading
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
@import '~common/stylus/variable.styl';

.channel-page {
  padding-top: 10px;

  .content {
    padding: 0 5px;

    .list-bar {
      display: flex;
      padding: 5px 10px;
      font-size: $font-size-medium;

      .title {
        font-size: 15px;
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
</style>
