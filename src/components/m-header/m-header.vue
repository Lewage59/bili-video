<template>
  <div class="m-header">
    <div class="suspension">
      <div class="suspension-box">
        <div class="navbar">
          <div class="logo">
            <i class="icon-bilibili"></i>
          </div>
          <router-link tag="div" to="/search" class="search-wrapper">
            <i class="icon-sousuo"></i>
            <span class="text">{{defaultWord}}</span>
          </router-link>
          <div class="face">
            <img :src="noface" class="bg-face" />
          </div>
        </div>
        <div class="channel-menu border-bottom">
          <div class="switcher">
            <slider class="switcher-wrapper">
              <switcher :list="switchList" displayType="start" :indexTab="indexTab" @switchTab="changeContent"></switcher>
            </slider>
            <div class="tab-more" @click="toggleList">
              <i class="icon-bottom"></i>
            </div>
          </div>
          <transition name="sliderTab">
            <div class="drawer" v-show="toggleTab" @click="toggleList">
              <ul @click.stop>
                <li v-for="(item, index) in switchList" :key="index" class="tab-item" :class="{ active: index === indexTab }" @click="changeContent(index)">
                  <span>{{item}}</span>
                </li>
                <i class="icon-top" @click="toggleList"></i>
                <div class="mask"></div>
              </ul>
            </div>
          </transition>
        </div>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
// import SearchBox from 'base/search-box/search-box'
import Slider from 'base/slider/slider'
import Switcher from 'base/switcher/switcher'
import noface from 'common/image/noface.gif'
import { switchList, ERR_OK } from 'api/config'
import { getSearchDefaultWords } from 'api/search'

export default {
  data () {
    return {
      noface,
      switchList,
      defaultWord: '',
      toggleTab: false
    }
  },
  props: {
    indexTab: {
      type: Number,
      default: 0
    }
  },
  components: {
    Slider,
    Switcher
  },
  created () {
    this._getSearchDefaultWords()
  },
  methods: {
    _getSearchDefaultWords () {
      getSearchDefaultWords().then(res => {
        if (res.data.code === ERR_OK) {
          this.defaultWord = res.data.data.show_name
        }
      })
    },
    changeContent (index) {
      if (index === 0) {
        this.$router.push({
          path: '/home'
        })
      } else {
        this.$router.push({
          path: `/channel/${index}`
        })
      }
    },
    toggleList () {
      this.toggleTab = !this.toggleTab
    }
  }
}
</script>

<style lang="stylus" scoped  rel="stylesheet/stylus">
@import '~common/stylus/variable.styl';
@import '~common/stylus/mixin.styl';

.m-header {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: $color-background;

  .suspension {
    position: relative;
    height: 84px;

    .suspension-box {
      position: fixed;
      width: 100%;
      z-index: 100;
      top: 0;

      .navbar {
        display: flex;
        justify-content: space-between;
        height: 44px;
        line-height: 44px;
        padding: 0 18px;
        background-color: $color-theme;

        .logo {
          flex: 0 0 61px;

          .icon-bilibili {
            color: $color-icon;
            font-size: 27px;
            vertical-align: middle;
          }
        }

        .search-wrapper {
          display: flex;
          align-items: center;
          height: 30px;
          width: 200px;
          padding: 0 10px;
          margin-top: 7px;
          border-radius: 30px;
          font-size: $font-size-medium;
          color: $color-text-l;
          background-color: rgba(0, 0, 0, 0.1);

          .text {
            no-wrap();
            flex: 1;
            line-height: 18px;
            margin: 0 5px;
            display: inline-block;
            font-size: $font-size-medium;
          }
        }

        .face {
          flex: 0 0 24px;
          vertical-align: top;

          .bg-face {
            width: 24px;
            border-radius: 50%;
            margin-top: 10px;
          }
        }
      }

      .channel-menu {
        position: fixed;
        height: 40.5px;
        width: 100%;

        .switcher {
          display: flex;
          align-items: center;
          background-color: #ffffff;

          .switcher-wrapper {
            position: relative;
            height: 100%;
            overflow: hidden;
            white-space: nowrap;
          }

          .tab-more {
            flex: 0 0 40px;
            height: 22px;
            line-height: 22px;
            margin-top: 5px;
            text-align: center;
            z-index: 1;

            .icon-bottom {
              width: 40px;
              color: #aaa;
            }
          }
        }

        .drawer {
          position: fixed;
          width: 100%;
          height: 100%;
          top: 44px;
          font-size: $font-size-medium;
          z-index: 1000;
          background-color: $color-background-d;

          &.sliderTab-enter, &.sliderTab-leave-to {
            opacity: 0;
          }

          &.sliderTab-enter-active, &.sliderTab-leave-active {
            transition: all 0.3s ease;
          }

          ul {
            position: relative;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            width: 100%;
            height: 160px;
            padding: 10px 20px 20px 20px;
            box-sizing: border-box;
            background-color: $color-background;
            color: $color-text-tab;

            .tab-item {
              display: inline-block;
              line-height: 28px;
              height: 28px;
              margin: 8px;

              &.active {
                color: $color-theme;
              }
            }

            .icon-top {
              position: absolute;
              left: 50%;
              bottom: 10px;
              transform: translateX(-50%);
              color: #aaa;
            }
          }
        }
      }
    }
  }
}
</style>
