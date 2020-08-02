<template>
  <div class="index">
    <m-header></m-header>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import mHeader from 'components/m-header/m-header'
export default {
  components: {
    mHeader
  }
}
</script>

<style>
</style>
