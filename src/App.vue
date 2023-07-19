<template>
  <div class="flex flex-col min-h-screen font-Roboto bg-weather-primary">
    <site-navigations />
    <router-view class="flex-1" v-slot="{ Component }">
      <transition>
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>
<script>
import SiteNavigations from "./components/SiteNavigations.vue";
export default {
  components: {
    SiteNavigations,
  },
};
</script>
<style>
.page-enter-active {
  transition: 600ms ease all;
}

.page-enter-from {
  opacity: 0;
}
</style>
