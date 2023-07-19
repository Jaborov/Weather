<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <div class="flex gap-3 flex-1 justify-end">
        <i
          class="fa-solid fa-location text-xl hover:text-weather-secondary duration-150 cursor-pointer"
          @click="getLocation"
        >
        </i>
      </div>
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
    <div class="flex flex-col gap-4">
      <Suspense>
        <CityList />
        <template #fallback>
          <CityCardSkeleton />
        </template>
      </Suspense>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import debounce from "lodash.debounce";
import CityList from "../components/CItyList.vue";
import CityCardSkeleton from "@/components/CityCardSkeleton.vue";
export default {
  components: {
    CityList,
    CityCardSkeleton,
  },
  name: "HomeView",
  data() {
    return {
      searechQuery: "",
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
    getLocation() {
      const succes = (position) => {
        position.coords.latitude;
        position.coords.longitude;
        this.$router.push({
          name: "cityView",
          params: { state: "Tajikistan", city: "Dushanbe" },
          query: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            preview: true,
          },
        });
      };
      const error = (err) => {
        alert(err);
      };
      navigator.geolocation.getCurrentPosition(succes, error);
    },
    previewCity(searchResult) {
      const [city, state] = searchResult.place_name.split(",");
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
            console.log(result.data.features);
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
