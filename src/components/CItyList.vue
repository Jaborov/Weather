<template>
  <div v-for="city in savedCities" :key="city.id">
    <CityCard :city="city" @click="goToCityView(city)" />
  </div>
  <p v-if="savedCities.length === 0">
    No locations added. To start tracking a location, search in the field above.
  </p>
</template>

<script>
import axios from "axios";
import CityCard from "../components/CityCard.vue";
export default {
  components: {
    CityCard,
  },
  data() {
    return {
      savedCities: [],
    };
  },
  mounted() {
    this.getCities();
  },
  methods: {
    async getCities() {
      if (localStorage.getItem("savedCities")) {
        this.savedCities = JSON.parse(localStorage.getItem("savedCities"));
        const requests = [];
        this.savedCities.forEach((city) => {
          requests.push(
            axios.get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.lng}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=metric`
            )
          );
        });
        const weatherData = await Promise.all(requests);
        weatherData.forEach((value, index) => {
          this.savedCities[index].weather = value.data;
        });
      }
    },
    async goToCityView(city) {
      this.$router.push({
        name: "cityView",
        params: { state: city.state, city: city.city },
        query: {
          id: city.id,
          lat: city.coords.lat,
          lng: city.coords.lng,
        },
      });
    },
  },
};
</script>
