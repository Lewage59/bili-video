<template>
  <div class="channel-page" v-if="regionList.length">
    <div class="content">
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
      sindexTab: 0,
      regionTags,
      regionList: []
    }
  },
  props: {
    indexTab: {
      type: String | Number,
      default: '0'
    }
  },
  created () {
    this._getsIndexTab()
  },
  methods: {
    _getsIndexTab () {
      if (isNaN(this.$route.params.sindex)) {
        return
      }
      this.sindexTab = this.$route.params.sindex
      this.$emit('sswitchTab', parseInt(this.sindexTab))
      this._getsRegion()
    },
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
    selectItem (item) {
      this.$router.push({ name: 'video', params: { bvid: item.bvid } })
    }
  },
  watch: {
    '$route' () {
      this._getsIndexTab()
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
