# bili-video

> 仿bilibili视频网站项目，非官方网站，本项目仅供学习和参考！！

# 一、前言
由于疫情原因，在家待了很长时间，所以在这段时间里对前端的知识进行了巩固及学习，然而在学了一段时间以后，有一种掌握了一些技术但却无处可施的感觉，于是脑海中就浮现了做一个项目的念头。有了这个念头之后，就开始想做什么呢？在一次逛B站的时候，对不起，我对它动手了（仿哔哩哔哩视频webapp）

从一开始对这个项目进行业务分析后，让我有着坚定的决心要长期维护这个项目，这个项目无论是从数据接口，还是运用技术上，我都煞费心血的肝，中途遇到困难真的有想放弃的念头，因为这个项目的数据接口一开始就是一个难题，由于网上目前还没有规范的相关数据接口文档，但是最后还是克服了，等项目基本完善后会整理出在这个项目中使用的数据接口供大家参考。本人前端大白菜一棵，大佬们轻喷，嘻嘻嘻。

[进入GitHub项目仓库](https://github.com/Lewage59/bili-video)（非常欢迎star和提pr）

[进入项目上线预览](http://47.115.5.221:8010)（建议使用chrome打开）

[注]本项目目前阶段还比较粗糙，后续会进行改进和优化哦！

## 项目进度（进度85%）
**首页**
 - switcher组件
 - 轮播图组件
 - scroll组件（better-scroll二次封装）
 - 视频推荐列表
 - loading组件
 - confirm组件

**视频播放页**
 - 视频播放器
 - 视频简介
 - 视频推荐
 - 视频评论

**搜索页**
 - 热门搜索标签
 - 历史搜索记录
 - 防抖搜索关键词及高亮显示
 - 搜索结果列表

**视频分区**
 - 分区分类视频列表

**视频分区排行榜**
 - 分区视频排行榜列表

## 真实数据来源
 - 通过自己研究获取的部分视频数据
 - 由GitHub上的[SocialSisterYi](https://github.com/SocialSisterYi/bilibili-API-collect)提供的部分视频数据（感谢给我节省了大量工作量）

# 二、项目介绍
## 项目整体架构
![在这里插入图片描述](https://user-gold-cdn.xitu.io/2020/5/14/1721117a6ac4503a?w=1647&h=1850&f=png&s=201510)
这是项目大体目前期望的整体架构，可能在后续开发中还会变化。。。

## 目录结构
```javascript
├─api               //数据请求接口、相关函数和基础配置
├─base              //基础UI组件
├─common            //通用样式、工具类函数和icon图标
├─components        //核心功能组件
├─router            //路由配置文件
└─store             //vuex状态管理文件
  App.vue           //根组件
  main.js           //入口文件
```

## 技术栈
 - `vue2.5`：一套用于构建用户界面的渐进式框架
 - `vue-router`： Vue.js 官方的路由管理器
 - `vue-lazyload`：在应用程序中懒散加载图像的Vue模块
 - `vue-awesome-swiper`：基于swiper封装的vue滑动特效插件
 - `fastclick`：消除物理点击和在移动浏览器上触发点击事件之间300毫秒的延迟
 - `better-scroll`：解决移动端各种滚动场景需求的插件
 - `axios`：请求后端api数据
 - `vuex`：专为 Vue.js 应用程序开发的状态管理模式

## 项目问题
 - 目前的项目性能较差，优化空间非常多，所以项目开发完成后会对性能进行优化
 - 搜索框的内容中不可带有空格如果带有空格，会导致搜索出的结果出现代码无法编译的问题
 - 搜索框需要清空文本框后输入才可显示搜索提示词
 - 播放器的播放功能在Safari浏览器不兼容，导致无法播放
 - 项目中的video-list模块设计思路错误

（以上问题是本菜鸡发现但还未解决的问题，后期会进行处理）

# 三、功能介绍
## 首页部分

![首页部分](https://user-gold-cdn.xitu.io/2020/5/14/1721124fdc1435a0?w=465&h=821&f=gif&s=4646564)
## 视频播放页
![视频播放页](https://user-gold-cdn.xitu.io/2020/5/14/1721117a6defdbd9?w=465&h=821&f=gif&s=2659020)
## 搜索页
![搜索页](https://user-gold-cdn.xitu.io/2020/5/14/1721117a6de94691?w=465&h=821&f=gif&s=836486)
## 视频排行榜
![视频排行榜](https://user-gold-cdn.xitu.io/2020/5/14/1721117a76bcb474?w=465&h=821&f=gif&s=3075694)
## 视频分区页
![视频分区页](https://user-gold-cdn.xitu.io/2020/5/14/1721117a76bb4d1c?w=465&h=821&f=gif&s=2583473)

# 五、部分功能代码展示
## 搜索框防抖核心代码
```js
// 防抖
export function debounce (func, delay) {
  let timer
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
```
## 高亮搜索词核心代码
```js
// 高亮关键词
export function setHighlight (keyword, item, className) {
  let s = new Set()
  for (let k of keyword) {
    s.add(k)
  }
  s.forEach(function (value) {
    item = item.replace(value, function () {
      return `<em class="${className}">${value}</em>`
    })
  })
  return item
}
```
## switcher组件实现标签切换效果
功能：该组件提供两种状态，为提供丝滑的交互动画，该组件灵活度高，底部移动条会自动根据元素宽度变化。只需要传入需要显示的列表数组。当发生点击时会响应当前位置的下标给调用组件。
1. 当组件需要使用在滚动导航栏上时，该组件样式切换为靠右排布，如下：
![在这里插入图片描述](https://user-gold-cdn.xitu.io/2020/5/14/1721117a9e981b7d?w=462&h=48&f=gif&s=122482)
2. 当组件需要使用于不需要滚动的切换tab上时，该组件样式切换为居中排布，如下：
![在这里插入图片描述](https://user-gold-cdn.xitu.io/2020/5/14/1721117a9eaca84b?w=462&h=48&f=gif&s=56103)
```html
<template>
  <div class="switcher" ref="switcher" :class="switcherType">
    <div class="switcher-tab" v-for="(item, index) in list" :key="index" :class="{active : index === indexTab}" @click="switchTab(index)">
      <span>{{item}}</span>
    </div>
    <div ref="anchor" class="switcher-header-anchor"></div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    },
    indexTab: {
      type: Number,
      default: 0
    },
    displayType: {
      type: String, // start居左，around居中
      default: 'start'
    }
  },
  computed: {
    switcherType () {
      return this.displayType === 'start' ? 'switcher-start' : 'switcher-around'
    }
  },
  created () {
    setTimeout(() => {
      this.moveAnchor(this.indexTab)
    }, 20)
  },
  methods: {
    switchTab (index) {
      if (this.indexTab !== index) {
        this.$emit('switchTab', index)
        this.moveAnchor(index)
      }
    },
    moveAnchor (index) {
      let tab = this.$refs.switcher.childNodes[index]
      this.$refs.anchor.style['transform'] = `translateX(${tab.offsetLeft + 16}px)`
      this.$refs.anchor.style.width = tab.offsetWidth - 32 + 'px'
    }
  },
  watch: {
    indexTab (newIndex) {
      if (newIndex) {
        this.moveAnchor(newIndex)
      }
    }
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
@import '~common/stylus/variable.styl';

.switcher {
  position: relative;
  display: flex;
  flex-direction: row;
  font-size: $font-size-medium;

  &.switcher-around {
    justify-content: space-evenly;
  }

  &.switcher-start {
    text-align: left;
  }

  .switcher-tab {
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    height: 40px;
    line-height: 40px;
    white-space: nowrap;
    padding: 0 16px;
    color: #505050;

    &.active {
      color: $color-theme;
    }
  }

  .switcher-header-anchor {
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    height: 2px;
    border-radius: 2px;
    background: $color-theme;
    transition: 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
}
</style>
```

# 四、未来期望
目前这个项目还有很多功能还未实现，所以在之后的时间里尽快将剩余功能实现，呈现出一个完善的webapp项目出来，同时我也非常乐意大家的star以及提pr的嘻嘻嘻，这个项目还在努力开发中。。。。


# Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```
