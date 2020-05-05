<template>
  <div class="comment">
    <div class="list">
      <ul>
        <li class="comment-item border-bottom" v-for="(item, index) in list" :key="index">
          <div class="head">
            <img class="img-head" :src="item.member.avatar">
          </div>
          <div class="detail">
            <div class="user">
              <span class="name">{{item.member.uname}}</span>
              <span class="like">
                <i class="icon-dianzan1"></i>
                <span>{{item.like | formatNumber}}</span>
              </span>
            </div>
            <div class="time">{{item.ctime | formatDate}}</div>
            <div class="content">{{item.content.message}}</div>
          </div>
          <div class="reply-preview">
            <p class="preview-item" v-for="(reply, key) in item.replies" :key="key">
              <span class="name">{{reply.member.uname + '：'}}</span>
              <span class="content">{{reply.content.message}}</span>
            </p>
            <div class="show-more">
              <span>{{'共' + item.rcount + '条回复'}}</span>
              <i class="icon-youjiantou"></i>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="comment-more">
      <button class="more-wrapper">
        <span class="text">查看更多评论</span>
        <i class="icon-youjiantou"></i>
      </button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { formatNumber, formatDate } from 'common/js/util'
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  filters: {
    formatNumber (num) {
      return formatNumber(num)
    },
    formatDate (time) {
      return formatDate(time, 'MM-dd')
    }
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
@import '~common/stylus/variable.styl';
@import '~common/stylus/mixin.styl';

.comment {
  .list {
    .comment-item {
      padding: 12px;

      &:last-child::before {
        border-bottom: 0;
      }

      .head {
        float: left;
        margin-top: 2px;

        .img-head {
          height: 30px;
          width: 30px;
          border-radius: 50%;
        }
      }

      .detail {
        margin-left: 45px;

        .user {
          .name {
            font-size: $font-size-small-x;
            color: $color-text-tab;
          }

          .like {
            float: right;
            color: $color-text-video;
            margin-top: 7px;

            span {
              font-size: $font-size-small-s;
            }
          }
        }

        .time {
          margin-top: 7px;
          color: $color-text-video;
          font-size: $font-size-small;
        }

        .content {
          line-height: 18px;
          white-space: pre-line;
          margin-top: 9px;
          font-size: $font-size-small-x;
          color: $color-text-comment;
        }
      }

      .reply-preview {
        margin: 10px 0 0 45px;
        padding: 10px;
        background-color: $color-background-tag;
        color: $color-text-comment;
        font-size: $font-size-small-x;
        border-radius: 3px;

        .preview-item {
          line-height: 18px;
          margin-top: 6px;
          color: $color-text-comment;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;

          &:first-child {
            margin-top: 0;
          }

          .name {
            vertical-aling: middle;
            color: $color-link;
          }

          .content {
            vertical-aling: middle;
          }
        }

        .show-more {
          font-size: $font-size-small;
          color: $color-link;
          margin-top: 8px;
        }
      }
    }
  }

  .comment-more {
    width: 100%;
    margin-top: 20px;
    margin-bottom: 15px;
    font-size: $font-size-medium;
    text-align: center;

    .more-wrapper {
      height: 35px;
      width: 350px;
      line-height: 35px;
      background: $color-background-tag;
      border-radius: 35px;
      border: 0px;

      .text {
        color: $color-text-comment;
      }
    }
  }
}
</style>
