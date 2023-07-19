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
      <div class="flex gap-3 flex-1 justify-end">
        <i
          @click="showModal"
          class="fa-solid fa-circle-info text-xl hover:text-weather-secondary duration-150 cursor-pointer"
        ></i>
        <i
          class="fa-solid fa-plus text-xl hover:text-weather-secondary duration-150 cursor-pointer"
          @click="addCity"
          v-if="$route.query.preview"
        ></i>
        <!-- <i
          class="fa-solid fa-location text-xl hover:text-weather-secondary duration-150 cursor-pointer"
          @click="getLocation()"
        ></i> -->
      </div>
      <BaseModal v-model:modalActive="modalDisable"
        ><h1 class="text-black">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id ut harum
          itaque in tempore, perferendis exercitationem ab, aperiam accusamus
          commodi blanditiis iure. Architecto, ipsam reiciendis! Architecto
          adipisci est fugiat numquam.
        </h1>
        <h1 class="text-black">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam est
          voluptate vero accusantium commodi totam labore eaque, architecto
          minima possimus nihil quod ad similique iure fugiat animi dolore natus
          atque?
        </h1>
      </BaseModal>
    </nav>
  </header>
</template>
<script>
import RouterLink from "vue-router";
import { uid } from "uid";
// import { mapActions } from "vuex";
import BaseModal from "./BaseModal.vue";
export default {
  components: {
    RouterLink,
    BaseModal,
  },
  data() {
    return {
      modalDisable: false,
      savedCities: [],
    };
  },
  methods: {
    // ...mapActions({
    //   getLocation: "getLocation",
    // }),
    showModal() {
      this.modalDisable = true;
    },
    addCity() {
      if (localStorage.getItem("savedCities")) {
        this.savedCities = JSON.parse(localStorage.getItem("savedCities"));
      }
      const locationObj = {
        id: uid(),
        state: this.$route.params.state,
        city: this.$route.params.city,
        coords: {
          lat: this.$route.query.lat,
          lng: this.$route.query.lng,
        },
      };
      this.savedCities.push(locationObj);
      localStorage.setItem("savedCities", JSON.stringify(this.savedCities));
      let query = Object.assign({}, this.$route.query);
      delete query.preview;
      query.id = locationObj.id;
      this.$router.replace({ query });
    },
  },
};
</script>
