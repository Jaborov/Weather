<template>
  <div>
    <AsyncCityView />
    <template>
      <p>Loading..</p>
    </template>
  </div>
</template>

<script>
import AsyncCityView from "@/components/AsyncCityView.vue";
export default {
  components: {
    AsyncCityView,
  },
};
</script>
