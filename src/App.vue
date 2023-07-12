<template>
  <div class="flex flex-col min-h-screen font-Roboto bg-weather-primary">
    <site-navigations />
    <router-view />
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
