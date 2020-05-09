<template>
  <div class="video-list">
    <ul>
      <li @click="selectItem(item.bvid)" class="video-item" v-for="(item, index) in list" :key="index">
        <div :class="getRankCls(index)">{{getRankText(index)}}</div>
        <div class="content">
          <div class="pic">
            <img v-lazy="item.pic">
            <span class="duration">{{item.duration}}</span>
          </div>
          <div class="info">
            <p class="title">{{item.title}}</p>
            <div class="author">
              <i class="icon-UPzhu"></i>
              {{item.author}}
            </div>
            <div class="count">
              <span>
                <i class="icon-bofangshu"></i>{{item.play | formatNumber}}
              </span>
              <span>
                <i class="icon-danmushu"></i>{{item.video_review | formatNumber}}
              </span>
            </div>
          </div>
        </div>
      </li>
      <div class="block-box" v-if="list.length"></div>
    </ul>
    <div class="no-result" v-if="!list.length">这里什么都没有</div>
  </div>
</template>

<script type="text/ecmascript-6">
import { formatNumber } from 'common/js/util'

export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  created () {
    this._getIndexTab()
  },
  methods: {
    _getIndexTab () {
      let index = parseInt(this.$route.params.index)
      if (isNaN(index)) {
        return
      }
      this.$emit('changeTab', index)
    },
    getRankCls (index) {
      if (index <= 2) {
        return `rank icon-rank-${index}`
      } else {
        return 'rank'
      }
    },
    getRankText (index) {
      if (index > 2) {
        return index + 1
      }
    },
    selectItem (bvid) {
      this.$router.push({ path: `/video/${bvid}` })
    }
  },
  watch: {
    '$route' () {
      this._getIndexTab()
    }
  },
  filters: {
    formatNumber (num) {
      return formatNumber(num)
    }
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
@import '~common/stylus/variable.styl';

.block-box {
  width: 100%;
  padding-top: 84px;
}

.video-list {
  ul {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;
    padding: 0 5px;

    .video-item {
      display: flex;
      align-items: center;
      padding: 6px;

      &:first-child {
        padding-top: 12px;
      }

      .rank {
        width: 21px;
        margin-right: 11px;
        font-size: $font-size-large;
        color: $color-text-tab;
        text-align: center;

        &.icon-rank-0 {
          font-size: $font-size-large-x;
          color: #e0b318;
        }

        &.icon-rank-1 {
          font-size: $font-size-large-x;
          color: #cacaca;
        }

        &.icon-rank-2 {
          font-size: $font-size-large-x;
          color: #a27958;
        }
      }

      .content {
        display: flex;
        flex: 1;

        .pic {
          position: relative;
          display: inline-block;

          img {
            width: 140px;
            border-radius: 5px;
          }

          .duration {
            position: absolute;
            right: 6px;
            bottom: 6px;
            padding: 0 2px;
            font-size: $font-size-small;
            color: $color-icon;
            background: $color-background-l;
          }
        }

        .info {
          flex: 1;
          margin-left: 10px;

          .title {
            color: #222222;
            font-size: $font-size-medium;
            line-height: 19px;
            margin-bottom: 8px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }

          .author {
            display: flex;
            align-items: center;
            line-height: 18px;
            margin-bottom: 4px;
            font-size: $font-size-small;
            color: $color-text-video;

            i {
              font-size: $font-size-medium-x;
              margin-right: 3px;
            }
          }

          .count {
            display: flex;
            line-height: 18px;
            font-size: $font-size-small;
            color: $color-text-video;

            span {
              display: flex;
              align-items: center;

              &:first-child {
                margin-right: 10px;
              }

              i {
                font-size: $font-size-medium-x;
                margin-right: 3px;
              }
            }
          }
        }
      }
    }
  }

  .no-result {
    width: 100%;
    height: 200px;
    text-align: center;
    color: $color-text-video;
  }
}
</style>
