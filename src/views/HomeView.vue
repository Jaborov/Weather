<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input
        v-model="searechQuery"
        @input="getSearchResults"
        type="text"
        placeholder="Search for a city or state"
        class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004e71]"
      />
      <ul
        class="abosolute bg-weather-secondary text-wthite w-full shadow-md py-2 px-1 top-[66px]"
        v-if="mapboxSearchResults"
      >
        <p class="py-2" v-if="searchError">
          Sorry went wrong, please try again.
        </p>
        <p class="py-2" v-if="!searchError && mapboxSearchResults.length === 0">
          No result match your query, try a different term
        </p>
        <template v-else>
          <li
            v-for="searchResult in mapboxSearchResults"
            :key="searchResult.id"
            class="py-2 cursor-pointer"
            @click="previewCity(searchResult)"
          >
            {{ searchResult.place_name }}
          </li>
        </template>
      </ul>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import debounce from "lodash.debounce";
export default {
  name: "HomeView",
  data() {
    return {
      searechQuery: "",
      qeryTimeout: null,
      mapboxSearchResults: null,
      searchError: null,
      mapboxAPIKey:
        "pk.eyJ1Ijoiam9obmtvbWFybmlja2kiLCJhIjoiY2t5NjFzODZvMHJkaDJ1bWx6OGVieGxreSJ9.IpojdT3U3NENknF6_WhR2Q",
    };
  },
  mounted() {
    this.getSearchResults();
  },
  methods: {
    previewCity(searchResult) {
      const [city, state] = searchResult.place_name.split(",");
      console.log(searchResult);
      this.$router.push({
        name: "cityView",
        params: { state: state.replaceAll(" ", ""), city: city },
        query: {
          lat: searchResult.geometry.coordinates[1],
          lng: searchResult.geometry.coordinates[0],
          preview: true,
        },
      });
    },
    getSearchResults: debounce(async function () {
      if (this.searechQuery !== "") {
        axios
          .get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${this.searechQuery}.json?access_token=${this.mapboxAPIKey}&types=place`
          )
          .then((result) => {
            this.mapboxSearchResults = result.data.features;
          })
          .catch(() => {
            this.searchError = true;
          })
          .finally(() => {
            return;
          });
      }
      this.mapboxSearchResults = null;
    }, 400),
  },
};
</script>
