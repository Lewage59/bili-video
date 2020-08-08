<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <transition name="slide">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

.slide-enter-active, .slide-leave-active {
  transition: all .3s ease;
}

.slide-enter, .slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

#app {

}
</style>
