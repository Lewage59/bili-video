import Vue from 'vue'
import Router from 'vue-router'
import Index from 'components/index/index'
import Home from 'components/home/home'
import Channel from 'components/channel/channel'
import Video from 'components/video/video'
import Search from 'components/search/search'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  routes: [
    {
      path: '/',
      component: Index,
      redirect: 'home',
      children: [
        {
          path: 'home',
          component: Home
        },
        {
          path: 'channel/:index',
          component: Channel
        }
      ]
    },
    {
      name: 'video',
      path: '/video/:bvid',
      component: Video
    },
    {
      name: 'search',
      path: '/search',
      component: Search
    }
  ]
})
