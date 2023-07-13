<template>
  <header class="sticky top-0 bg-weather-primary shadow-lg">
    <nav
      class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6"
    >
      <RouterLink :to="{ name: 'home' }">
        <div class="flex items-center gap-3">
          <i class="fa-solid fa-sun text-2xl"></i>
          <p class="text">The Local Wheather</p>
        </div>
      </RouterLink>
    </nav>
  </header>
</template>
<script>
import RouterLink from "vue-router";
export default {
  components: {
    RouterLink,
  },
  data() {
    return {
      modalDisable: false,
    };
  },
  methods: {
    showModal() {
      this.modalDisable = true;
    },
  },
};
</script>
