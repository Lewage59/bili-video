<template>
  <div class="video">
    <div class="video-container" v-show="JSON.stringify(videoInfo) !== '{}'">
      <div class="navbar-video">
        <div class="navbar-box">
          <div class="back" @click="back ">
            <i class="icon-zuojiantou1"></i>
          </div>
          <router-link tag="div" to="/" class="logo ">
            <i class="icon-bilibili-line"></i>
          </router-link>
        </div>
      </div>
      <div class="block-box"></div>
      <scroll ref="content" class="video-content" :bounce="bounce" :data="recommendList">
        <div>
          <div class="video-player">
            <img :src="videoInfo.pic" class="cover">
            <iframe class="player-wrapper" :src="playerSrc" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>
          </div>
          <div class="video-info">
            <div class="title">
              <div class="left">
                <h1 :class="{spread : fold}">{{videoInfo.title}}</h1>
              </div>
              <div class="right" :class="{spread : fold} ">
                <i class="icon-top" @click="toggleFold "></i>
              </div>
            </div>
            <div class="data" v-if="statCount">
              <span class="author">
                <i class="icon-UPzhu"></i>
                <span class="up">{{upInfo.name}}</span>
              </span>
              <span class="view">{{this.statCount.view | formatNumber}}次观看</span>
              <span class="danmu">{{this.statCount.danmaku | formatNumber}}弹幕</span>
              <span class="time">{{this.videoInfo.ctime | formatDate}}</span>
            </div>
            <div class="fold-container" ref="fold">
              <div class="fold-area" ref="foldArea">
                <div v-if="videoInfo.copyright === 1" class="copyright">
                  <i class="icon-jinzhi"></i>
                  <span>未经作者授权禁止转载</span>
                </div>
                <div class="desc">{{videoInfo.desc}}</div>
                <div class="tags-wrapper">
                  <tags :list="tagsList"></tags>
                </div>
              </div>
            </div>
          </div>
          <div class="video-toolbar border-bottom">
            <span class="toolbar-item">
              <i class="icon-dianzan"></i>
              <div>{{statCount.like | formatNumber}}</div>
            </span>
            <span class="toolbar-item">
              <i class="icon-qianbi1"></i>
              <div>{{statCount.coin | formatNumber}}</div>
            </span>
            <span class="toolbar-item">
              <i class="icon-shoucang"></i>
              <div>{{statCount.favorite | formatNumber}}</div>
            </span>
            <span class="toolbar-item">
              <i class="icon-zhuanfa"></i>
              <div>{{statCount.share | formatNumber}}</div>
            </span>
          </div>
          <div class="bottom-tab">
            <div class="switcher-wrapper" v-if="switchList.length">
              <switcher :list="switchList" :indexTab="indexTab" @switchTab="changeContent" displayType="around"></switcher>
            </div>
            <div class="switcher-content">
              <div class="content-item" v-show="indexTab === 0" key="recommend">
                <div class="recommend-wrapper">
                  <card-list @select="selectItem" :list=" recommendList"></card-list>
                </div>
              </div>
              <div class="content-item" v-show="indexTab === 1" key="comment">
                <div class="comment-wrapper">
                  <comment :list="commentList"></comment>
                </div>
              </div>
            </div>
          </div>
          <div class="block-box"></div>
        </div>
      </scroll>
    </div>
    <div v-show="JSON.stringify(videoInfo) === '{}'" class="loading-container">
      <loading></loading>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { ERR_OK } from 'api/config'
import { getVideoInfo, getRecommend, getComment, getTags } from 'api/video'
import { formatNumber, formatDate } from 'common/js/util'
import Switcher from 'base/switcher/switcher'
import CardList from 'base/card-list/card-list'
import Scroll from 'base/scroll/scroll'
import Tags from 'base/tags/tags'
import Comment from 'components/comment/comment'
import Loading from 'base/loading/loading'

export default {
  data () {
    return {
      bvid: {},
      videoInfo: {},
      upInfo: {},
      statCount: {},
      fold: true,
      indexTab: 0,
      switchList: [],
      recommendList: [],
      commentList: [],
      tagsList: []
    }
  },
  computed: {
    playerSrc () {
      return `https://player.bilibili.com/player.html?aid=${this.videoInfo.aid}&bvid=${this.bvid}&cid=${this.videoInfo.cid}&page=1`
    }
  },
  created () {
    this.bounce = false
    this.bvid = this.$route.params.bvid
    this._getVideoInfo()
  },
  methods: {
    _getVideoInfo () {
      getVideoInfo(this.bvid).then(res => {
        if (res.data.code === ERR_OK) {
          this.videoInfo = res.data.data
          this.upInfo = res.data.data.owner
          this.statCount = res.data.data.stat
          this._setSwitchList()
          this._getRecommend()
          this._getComment()
          this._getTags()
        }
      }).catch(err => {
        console.log(err)
      })
    },
    _getRecommend () {
      getRecommend(this.bvid).then(res => {
        if (res.data.code === ERR_OK) {
          this.recommendList = res.data.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    _getComment () {
      getComment(this.videoInfo.aid).then(res => {
        if (res.data.code === ERR_OK) {
          this.commentList = res.data.data.replies
        }
      }).catch(err => {
        console.log(err)
      })
    },
    _getTags () {
      getTags(this.videoInfo.aid).then(res => {
        if (res.data.code === ERR_OK) {
          this.tagsList = res.data.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    _setSwitchList () {
      this.switchList = [{ name: '相关推荐' }, { name: `评论 ${formatNumber(this.statCount.reply)}` }]
    },
    back () {
      this.$router.back()
    },
    selectItem (item) {
      this.$refs.content.scrollTo(0, 0)
      this.$router.push({ name: 'video', params: { bvid: item.bvid } })
    },
    toggleFold () {
      this.fold = !this.fold
      if (this.fold) {
        this.$refs.fold.style.height = 0
      } else {
        this.$refs.fold.style.height = this.$refs.foldArea.clientHeight + 5 + 'px'
      }
      this.$refs.content.refresh()
    },
    changeContent (index) {
      this.indexTab = index
    }
  },
  filters: {
    formatNumber (num) {
      return formatNumber(num)
    },
    formatDate (time) {
      return formatDate(time, 'MM-dd')
    }
  },
  components: {
    Switcher,
    CardList,
    Scroll,
    Comment,
    Tags,
    Loading
  },
  watch: {
    '$route' (to, from) {
      if (to.params.bvid !== from.params.bvid) {
        this.bvid = to.params.bvid
        this._getVideoInfo()
      }
    }
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
@import '~common/stylus/variable.styl';
@import '~common/stylus/mixin.styl';

// 顶格块
.block-box {
  width: 100%;
  padding-top: 44px;
}

.video {
  position: relative;
  top: 0;
  left: 0;
  height: 100vh;

  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}

.video-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  .navbar-video {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    height: 44px;
    width: 100%;

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
    }

    .logo {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      display: inline-block;

      .icon-bilibili-line {
        color: $color-icon;
        font-size: 27px;
        vertical-align: middle;
      }
    }
  }

  .video-content {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;

    .video-player {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 56.25%;

      .cover {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }

      .player-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }

    .video-info {
      position: relative;
      padding: 0 12px;
      margin-top: 15px;

      .title {
        line-height: 24px;
        display: flex;
        justify-content: space-between;
        font-size: $font-size-medium-x;
        color: $color-text;

        .left {
          flex: 1;
          overflow: hidden;

          .spread {
            no-wrap();
          }
        }

        .right {
          color: #999;
          height: 24px;
          transition: 0.1s ease;

          &.spread {
            transform: rotate(-180deg);
          }
        }
      }

      .data {
        margin-top: 8px;
        color: $color-text-video;
        font-size: $font-size-small;

        .author {
          vertical-align: top;
          margin-right: 18px;
          color: #212121;

          .icon-UPzhu {
            font-size: $font-size-medium;
            vertical-align: middle;
          }
        }

        .view, .danmu {
          margin-right: 8px;
        }
      }

      .fold-container {
        height: 0;
        transition: height 0.3s;
        overflow: hidden;

        .fold-area {
          color: $color-text-video;
          font-size: $font-size-small;

          .copyright {
            margin-top: 5px;
            line-height: 18px;

            .icon-jinzhi {
              vertical-align: middle;
              font-size: $font-size-medium;
              color: #fb7299;
            }

            span {
              vertical-align: middle;
            }
          }

          .desc {
            line-height: 18px;
            padding-top: 5px;
            white-space: pre-wrap;
          }

          .tags-wrapper {
            margin-top: 11px;
          }
        }
      }
    }

    .video-toolbar {
      display: flex;
      background: $color-background = #ffffff;
      color: $color-text-video;
      padding: 12px;

      .toolbar-item {
        flex: 1;
        font-size: $font-size-large;

        i {
          display: block;
          text-align: center;
        }

        div {
          display: inline-block;
          width: 100%;
          text-align: center;
          font-size: $font-size-small-s;
        }
      }
    }

    .bottom-tab {
      .switcher-wrapper {
        padding: 0 16px;
      }

      .switcher-content {
        .recommend-wrapper {
          padding: 5px 5px;
        }
      }
    }
  }
}
</style>
