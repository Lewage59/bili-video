<template>
  <div class="home">
    <scroll :data="recommendList" class="home-content">
      <div v-if="recommendList">
        <div class="slider-wrapper">
          <swiper ref="mySwiper" :options="swiperOptions">
            <swiper-slide v-for="(item, index) in sliderImage" :key="index">
              <img class="slider-img" :src="item">
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </div>
        <div class="recommend-list">
          <card-list @select="selectItem" :list="recommendList"></card-list>
        </div>
        <div class="loading-container" v-show="!recommendList.length">
          <loading title=""></loading>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import { ERR_OK, sliderImage } from 'api/config'
import Scroll from 'base/scroll/scroll'
import cardList from 'base/card-list/card-list'
import Loading from 'base/loading/loading'
import { getRecommend } from 'api/recommend'

export default {
  data () {
    return {
      recommendList: [],
      sliderImage: sliderImage,
      swiperOptions: {
        pagination: '.swiper-pagination',
        autoplay: 4000,
        loop: true
      }
    }
  },
  created () {
    setTimeout(() => {
      this._getRecommend()
    }, 20)
  },
  computed: {
    showSwiper () {
      return this.list.length
    }
  },
  methods: {
    _getRecommend () {
      getRecommend().then(res => {
        if (res.data.code === ERR_OK) {
          let tmp = Object.values(res.data)
          for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
              this.recommendList.push(tmp[i][j])
            }
          }
        }
      }).catch(err => {
        console.log(err)
      })
    },
    selectItem (item) {
      this.$router.push({ name: 'video', params: { bvid: item.bvid } })
    }
  },
  components: {
    cardList,
    Scroll,
    Loading
  }
}
</script>

<style lang="stylus" scoped  rel="stylesheet/stylus">
@import '~common/stylus/variable.styl';
@import '~common/stylus/mixin.styl';

.slider-wrapper >>> .swiper-pagination-bullet {
  background: $color-background;
  opacity: 1;
}

.slider-wrapper >>> .swiper-pagination-bullet-active {
  background: $color-theme;
}

.home {
  position: fixed;
  width: 100%;
  top: 84px;
  bottom: 0;

  .home-content {
    overflow: hidden;
    height: 100%;

    .slider-wrapper {
      padding: 10px 10px 0 10px;

      .slider-img {
        width: 100%;
      }
    }

    .recommend-list {
      padding: 0 5px;
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
