<template>
  <div class="card-list">
    <div class="v-card" @click="selectItem(item)" v-for="(item, index) in list" :key="index">
      <div class="card">
        <img v-lazy="item.pic" class="pic">
        <div class="count">
          <div class="left">
            <span>
              <i class="icon-bofangshu"></i>{{item.stat.view | formatNumber}}
            </span>
            <span>
              <i class="icon-danmushu"></i>{{item.stat.danmaku | formatNumber}}
            </span>
          </div>
          <span class="duration">{{item.duration | formatTime}}</span>
        </div>
      </div>
      <p class="title">{{item.title}}</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { formatNumber, formatTime } from 'common/js/util'

// 由于接收的list有两种不同格式的数据，所以对两种格式做了部分兼容
export default {
  props: {
    list: {
      type: Array,
      default: null
    }
  },
  methods: {
    selectItem (item) {
      this.$emit('select', item)
    }
  },
  filters: {
    formatNumber (num) {
      return formatNumber(num)
    },
    formatTime (duration) {
      return formatTime(duration)
    }
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
@import '~common/stylus/variable.styl';
@import '~common/stylus/mixin.styl';

.card-list {
  display: flex;
  flex-wrap: wrap;

  .v-card {
    display: inline-block;
    width: 50%;
    padding: 8px 5px;
    box-sizing: border-box;

    .card {
      position: relative;
      overflow: hidden;
      border-radius: 3px;

      .pic {
        top: 0;
        left: 0;
        width: 100%;
        height: 100px;
      }

      .count {
        display: flex;
        justify-content: space-between;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 5px 6px;
        box-sizing: border-box;
        color: #ffffff;
        font-size: $font-size-small;
        background: linear-gradient(0deg, rgba(0, 0, 0, 0.85), transparent);

        .left {
          span {
            margin-right: 5px;
          }
        }

        i {
          margin-right: 5px;
        }
      }
    }

    .title {
      font-size: 13px;
      line-height: 16px;
      margin-top: 6px;
      color: #212121;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}
</style>
